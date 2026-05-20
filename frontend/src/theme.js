import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8EAD5F", // Olive Green (Navbar, Secondary Buttons)
    },
    secondary: {
      main: "#F4C842", // Mustard Yellow (Primary Buttons)
    },
    background: {
      default: "#FFF5E1", // Soft Beige (Body Background)
      paper: "#FFFFFF", // White (Card Background)
    },
    text: {
      primary: "#333333", // Dark Grey (Paragraph Text)
      secondary: "#5D4037", // Dark Brown (Product List Text & Primary Button Text)
    },
    error: {
      main: "#D32F2F", // Deep Red (Error Messages)
    },
    success: {
      main: "#81C784", // Light Green (Success Messages)
    },
    warning: {
      main: "#E74C3C", // Tomato Red (Headings)
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h1: { color: "#E74C3C", fontWeight: "bold" }, // Tomato Red
    h2: { color: "#E74C3C", fontWeight: "bold" }, // Tomato Red
    body1: { color: "#333333" }, // Dark Grey
    body2: { color: "#5D4037" }, // Dark Brown
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Remove uppercase text
          borderRadius: "8px",
          fontWeight: "bold",
        },
        containedPrimary: {
          backgroundColor: "#8EAD5F",
          color: "#FFFFFF",
          "&:hover": { backgroundColor: "#7A964E" }, // Slightly darker Olive Green
        },
        containedSecondary: {
          backgroundColor: "#F4C842",
          color: "#5D4037",
          "&:hover": { backgroundColor: "#E3B93A" }, // Slightly darker Mustard Yellow
        },
      },
    },
  },
});

export default theme;
