import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#200444",
      light: "#4D2E6A",
      dark: "#12022A",
      contrastText: "#fff",
    },
    secondary: {
      main: "#CC3300",
      light: "#FF6633",
      dark: "#991F00",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    h6: {
      fontSize: 18,
      fontWeight: 500,
      [createTheme().breakpoints.down("sm")]: {
        fontSize: 14
      },
    },
    body1: {
      fontSize: 14,
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#991F00",
          },
        },
      },
    },
  },
});

export default theme;
