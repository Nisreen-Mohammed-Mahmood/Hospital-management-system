import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const links = [
    { text: "Home", to: "/" }, // Assuming Home route is '/'
    { text: "Services", to: "/services" },
    { text: "Doctors", to: "/doctors" },
    { text: "Contact", to: "/contact" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#fff", boxShadow: "none", top: 0 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo for mobile view */}
          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
              <Box sx={{ width: 250, padding: 2 }}>
                <img
                  src={Logo}
                  alt="Hospital Logo"
                  style={{ height: "100px", marginBottom: "16px" }}
                />
                <List>
                  {links.map((link) => (
                    <ListItem
                      button
                      key={link.text}
                      onClick={toggleDrawer}
                      sx={{
                        color: "primary.main",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.04)",
                        },
                      }}
                    >
                      <Link
                        to={link.to}
                        style={{
                          width: "100%",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <ListItemText
                          primary={link.text}
                          sx={{ fontWeight: "bold" }}
                        />
                      </Link>
                    </ListItem>
                  ))}
                </List>
                <Box
                  sx={{
                    marginTop: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "primary.main",
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{
                      "&:hover": {
                        backgroundColor: "primary.main",
                      },
                    }}
                  >
                    Register
                  </Button>
                </Box>
              </Box>
            </Drawer>
          </Box>
          {/* Logo for larger screens */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <img
              src={Logo}
              alt="Hospital Logo"
              style={{ height: "100px", margin: "5px" }}
            />
          </Box>
          {/* Navigation Links for larger screens */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            {links.map((link) => (
              <Link
                key={link.text}
                to={link.to}
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Box
                  sx={{
                    fontSize: "20px",
                    color: "primary.main",
                    position: "relative",
                    padding: "8px 16px",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  {link.text}
                </Box>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                color="primary"
                variant="outlined"
                startIcon={<LoginIcon />}
                sx={{
                  "& .MuiButtonBase-root": {
                    color: "primary.color !important",
                  },
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "primary.main",
                    borderColor: "primary.main",
                  },
                }}
              >
                Login
              </Button>
            </Link>

            <Link to="/register" style={{ textDecoration: "none" }}>
              {" "}
              {/* Wrap the Register button */}
              <Button
                color="primary"
                variant="contained"
                sx={{
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                Register
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
