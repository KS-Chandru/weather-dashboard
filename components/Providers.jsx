"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useState, useMemo, createContext } from "react";

export const ThemeContext = createContext({
  mode: "light",
  setMode: () => {},
});

export default function Providers({ children }) {
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          style={{
            minHeight: "100vh",
            background:
              mode === "dark"
                ? "linear-gradient(135deg, #141E30, #243B55)"
                : "linear-gradient(135deg, #89f7fe, #66a6ff)",
            padding: 20,
          }}
        >
          {children}
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
