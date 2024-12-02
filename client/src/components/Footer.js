import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        p: 2,
        backgroundColor: "primary.main",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} HealthConnect. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
