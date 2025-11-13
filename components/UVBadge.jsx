// components/UVBadge.jsx
"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "./Providers";

export default function UVBadge({ uv }) {
  const { mode, glassBackground, hardText } = useContext(ThemeContext);

  if (uv === undefined || uv === null) return null;

  let label = "Low",
    color = "#2ecc71";
  if (uv >= 3 && uv < 6) {
    label = "Moderate";
    color = "#f1c40f";
  }
  if (uv >= 6 && uv < 8) {
    label = "High";
    color = "#e67e22";
  }
  if (uv >= 8 && uv < 11) {
    label = "Very High";
    color = "#e74c3c";
  }
  if (uv >= 11) {
    label = "Extreme";
    color = "#7f0000";
  }

  return (
    <Card
      sx={{
        mb: 2,
        background:
          mode === "dark" ? "rgba(34, 192, 207, 0.12)" : glassBackground,
        color: hardText,
        backdropFilter: "blur(8px)",
        border:
          mode === "light"
            ? "1px solid rgba(0, 150, 136, 0.3)"
            : "1px solid rgba(34, 192, 207, 0.2)",
      }}
    >
      <CardContent>
        <Typography variant="subtitle2">UV Index</Typography>
        <Typography variant="h5" sx={{ color }}>
          {uv} • {label}
        </Typography>
      </CardContent>
    </Card>
  );
}
