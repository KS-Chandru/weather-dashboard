// components/DarkModeToggle.jsx
"use client";

import { Switch, Box } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "./Providers";

export default function DarkModeToggle() {
  const { mode, setMode } = useContext(ThemeContext);

  return (
    <Box display="flex" alignItems="center">
      <Switch
        checked={mode === "dark"}
        onChange={() => setMode(mode === "dark" ? "light" : "dark")}
      />
    </Box>
  );
}
