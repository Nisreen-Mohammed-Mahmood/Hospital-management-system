import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  Button,
  useTheme,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import logoImage from "../assets/images/HealthConnect.png";
import { logout } from "../features/authSlice";

const Sidebar = ({ mobileOpen, onDrawerToggle, isMobile }) => {
  const theme = useTheme();
  const { email, role } = useSelector((state) => state.auth.user);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const links = [
    {
      path: `/${role}/appointments`,
      label: "Appointments",
      icon: <EventIcon />,
    },
    { path: `/${role}/doctors`, label: "Doctors", icon: <LocalHospitalIcon /> },
    {
      path: `/${role}/billingHistory`,
      label: "Billing History",
      icon: <CreditScoreIcon />,
    },
    { path: `/${role}/profile`, label: "Profile", icon: <PersonIcon /> },
  ];

  const isActive = (path) => location.pathname === path;

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* Sidebar Header with sticky positioning */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: theme.palette.background.paper,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Avatar
          sx={{
            width: isMobile ? 70 : 100,
            height: isMobile ? 70 : 100,
            borderRadius: "30px !important",
            mt: isMobile ? "60px" : 0,
            mb: 2,
          }}
          src={logoImage}
          alt="Logo"
        />
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {email}
        </Typography>
      </Box>

      {/* Navigation Links */}
      <List sx={{ flexGrow: 1 }}>
        {links.map((link) => (
          <ListItem
            button
            key={link.path}
            component={Link}
            to={link.path}
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              backgroundColor: isActive(link.path)
                ? theme.palette.action.selected
                : "transparent",
              borderRadius: 2,
              padding: "10px 20px",
              transition: "background-color 0.3s ease",
            }}
          >
            <ListItemIcon
              sx={{
                color: isActive(link.path)
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
              }}
            >
              {link.icon}
            </ListItemIcon>
            <ListItemText
              primary={link.label}
              sx={{
                color: isActive(link.path)
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
              }}
            />
          </ListItem>
        ))}
      </List>
      {/* logout on mobile screen */}
      {isMobile && (
        <Box
          sx={{
            padding: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleLogout}
          >
            <LogoutIcon sx={{ mr: 1 }} /> Logout
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
      {isMobile ? (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              borderRight: "none",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
