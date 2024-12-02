import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#003B5C",
    },
    secondary: {
      main: "#D9EAD3",
    },
    typography: {
      color: "#003B5C",
    },

    // Add more colors as needed
  },
  typography: {
    fontFamily: "Etna Free Font, sans-serif",
  },
});

export default theme;
