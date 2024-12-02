import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { logout } from "../features/authSlice";

const PatientHeader = ({ onMenuClick, isMobile }) => {
  const { name } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "#fff",
        color: "text.primary",
        boxShadow: "none",
      }}
      elevation={1}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography variant="h5" noWrap>
            Hello, {name}{" "}
            <WavingHandIcon sx={{ ml: 1, verticalAlign: "middle" }} />
          </Typography>
        </Box>
        {/* Show Logout button only on non-mobile screens */}
        {!isMobile && (
          <Button color="primary" variant="contained" onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1 }} /> Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default PatientHeader;
