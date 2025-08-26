import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
  interface Palette {
    buttons: {
      buttonGreenBack: string;
      buttonGreenText: string;
    };
  }
  interface PaletteOptions {
    buttons?: {
      buttonGreenBack?: string;
      buttonGreenText?: string;
    };
  }
}
