import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff",
      light: "#e3f2fd",
      dark: "#0056b3",
    },
    secondary: {
      main: "#A680FF",
      light: "#f8f9fa",
      dark: "#545b62",
    },
    success: {
      main: "#28a745",
      light: "#d4edda",
      dark: "#1e7e34",
    },
    warning: {
      main: "#ffc107",
      light: "#fff3cd",
      dark: "#e0a800",
    },
    error: {
      main: "#dc3545",
      light: "#f8d7da",
      dark: "#c82333",
    },
    info: {
      main: "#17a2b8",
      light: "#d1ecf1",
      dark: "#138496",
    },
    common: {
      white: "#ffffff",
      black: "#000000",
    },
    grey: {
      50: "#fafafa",
      100: "#f8f9fa",
      200: "#e9ecef",
      300: "#dee2e6",
      400: "#ced4da",
      500: "#adb5bd",
      600: "#6c757d",
      700: "#495057",
      800: "#343a40",
      900: "#212529",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#212529",
    },
  },

  typography: {
    fontFamily: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
    fontSize: 16,
    htmlFontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: { fontSize: "2.25rem" }, // 36px
    h2: { fontSize: "1.875rem" }, // 30px
    h3: { fontSize: "1.5rem" }, // 24px
    h4: { fontSize: "1.25rem" }, // 20px
    h5: { fontSize: "1.125rem" }, // 18px
    h6: { fontSize: "1rem" }, // 16px
    body1: { fontSize: "1rem", lineHeight: 1.5 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
    caption: { fontSize: "0.75rem" },
  },

  spacing: 8, // 1 unit = 4px (your spacing system is in 4px multiples)

  shape: {
    borderRadius: 6, // --radius-base
  },

  shadows: [
    "none",
    "0 1px 2px 0 rgba(0, 0, 0, 0.05)", // 1 - sm
    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)", // 2 - base
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)", // 3 - md
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)", // 4 - lg
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)", // 5 - xl
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)", // 6 - 2xl
    "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)", // 7 - inner
    "0 1px 2px rgba(0, 0, 0, 0.06)", // 8
    "0 1px 3px rgba(0, 0, 0, 0.1)", // 9
    "0 2px 4px rgba(0, 0, 0, 0.1)", // 10
    "0 3px 6px rgba(0, 0, 0, 0.1)", // 11
    "0 4px 8px rgba(0, 0, 0, 0.1)", // 12
    "0 5px 10px rgba(0, 0, 0, 0.1)", // 13
    "0 6px 12px rgba(0, 0, 0, 0.1)", // 14
    "0 8px 16px rgba(0, 0, 0, 0.1)", // 15
    "0 10px 20px rgba(0, 0, 0, 0.1)", // 16
    "0 12px 24px rgba(0, 0, 0, 0.1)", // 17
    "0 14px 28px rgba(0, 0, 0, 0.1)", // 18
    "0 16px 32px rgba(0, 0, 0, 0.1)", // 19
    "0 18px 36px rgba(0, 0, 0, 0.1)", // 20
    "0 20px 40px rgba(0, 0, 0, 0.1)", // 21
    "0 22px 44px rgba(0, 0, 0, 0.1)", // 22
    "0 24px 48px rgba(0, 0, 0, 0.1)", // 23
    "0 26px 52px rgba(0, 0, 0, 0.1)", // 24
  ],

  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: "ease-in-out",
      easeOut: "ease-out",
      easeIn: "ease-in",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },

  zIndex: {
    mobileStepper: 1000,
    appBar: 1020,
    drawer: 1030,
    modal: 1050,
    snackbar: 1060,
    tooltip: 1070,
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});

export default theme;
