import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Sidebar from "../components/Sidebar";
import PatientHeader from "../components/PatientHeader";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const DoctorLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const username = useSelector((state) => state.user.username);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        role="patient"
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: { sm: `calc(100% - 240px)` },
        }}
      >
        <PatientHeader
          username={username}
          onMenuClick={handleDrawerToggle}
          isMobile={isMobile}
        />
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "#f5f5f5",
            p: 3,
            minHeight: "100%",
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default DoctorLayout;
