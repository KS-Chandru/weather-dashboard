// components/Providers.jsx
"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useState, useMemo, createContext, useEffect, useRef } from "react";

export const ThemeContext = createContext({
  mode: "light",
  setMode: () => {},
  glassBackground: "",
  cardTextColor: "",
  hardText: "",
});

export default function Providers({ children }) {
  // Start with server-safe default
  const [mode, setMode] = useState("light");
  const mounted = useRef(false);

  // Sync with system preference on client-side only
  useEffect(() => {
    if (!mounted.current) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        // Guarded by mounted.current to prevent multiple calls
        setMode("dark");
      }
      mounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Theme-aware color helpers
  // Teal/Cyan color scheme - synced for both light and dark modes
  const glassBackground =
    mode === "dark"
      ? "rgba(34, 192, 207, 0.12)" // Dark teal
      : "linear-gradient(135deg, rgba(34, 192, 207, 0.12), rgba(0, 150, 136, 0.1))"; // Light teal

  const cardTextColor = mode === "dark" ? "#4fc3f7" : "#00796b";
  const hardText = mode === "dark" ? "#80deea" : "#00695c";

  // MUI theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "dark" ? "#4fc3f7" : "#00897b",
          },
          ...(mode === "light"
            ? {
                background: { default: "#e0f2f1" },
                text: { primary: "#00695c", secondary: "#00897b" },
              }
            : {
                background: { default: "#0d1b1a" },
                text: { primary: "#80deea", secondary: "#4fc3f7" },
              }),
        },
        typography: { fontFamily: "Inter, sans-serif" },
      }),
    [mode]
  );

  // App background - Teal theme
  const bgImage =
    mode === "dark"
      ? "linear-gradient(135deg, #0d1b1a 0%, #1a3a39 50%, #0f2c2a 100%)" // Dark teal gradient
      : "linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 50%, #80cbc4 100%)";

  return (
    <ThemeContext.Provider
      value={{ mode, setMode, glassBackground, cardTextColor, hardText }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          style={{
            minHeight: "100vh",
            padding: "clamp(12px, 4vw, 32px)",
            backgroundImage: bgImage,
            backgroundRepeat: "no-repeat",
            backgroundSize: "200% 200%",
            backgroundPosition: "center",
            transition: "background 600ms ease",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "clamp(330px, 90vw, 980px)",
              boxSizing: "border-box",
            }}
          >
            {children}
          </div>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
