import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";

import router from "./router/index.tsx";
import theme from "./theme/theme.ts";
import GlobalStylesMUI from "./theme/GlobalStylesMUI.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStylesMUI />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
