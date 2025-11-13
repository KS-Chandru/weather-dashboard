"use client";

import { Switch } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "@/components/Providers";

export default function DarkModeToggle() {
  const { mode, setMode } = useContext(ThemeContext);

  return (
    <Switch
      checked={mode === "dark"}
      onChange={() => setMode(mode === "dark" ? "light" : "dark")}
    />
  );
}
