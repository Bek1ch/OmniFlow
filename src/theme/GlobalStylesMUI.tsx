import { GlobalStyles } from "@mui/material";

function GlobalStylesMUI() {
  return (
    <GlobalStyles
      styles={(theme) => ({
        // Scrollbar start
        "::-webkit-scrollbar": {
          width: "8px",
        },
        "::-webkit-scrollbar-track": {
          background: theme.palette.background.default,
          borderRadius: "3px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.text.primary,
          borderRadius: "3px",
        },
        // Scrollbar end
      })}
    />
  );
}

export default GlobalStylesMUI;
