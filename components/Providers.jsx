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
        typography: {
          fontFamily: "Inter, sans-serif",
        },
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
            padding: 30,
            backgroundImage:
              mode === "dark"
                ? "linear-gradient(135deg,#0f0c29,#302b63,#24243e)"
                : "linear-gradient(135deg,#a1c4fd,#c2e9fb)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "200% 200%",
            backgroundPosition: "center",
            animation: "gradient 8s ease infinite",
          }}
        >
          <style>{`
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>{children}</div>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
