// components/AQI.jsx
"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "./Providers";

function aqiLabel(aqi) {
  if (aqi <= 50) return { txt: "Good", color: "#2ecc71" };
  if (aqi <= 100) return { txt: "Moderate", color: "#f1c40f" };
  if (aqi <= 150) return { txt: "Unhealthy (SG)", color: "#e67e22" };
  if (aqi <= 200) return { txt: "Unhealthy", color: "#e74c3c" };
  if (aqi <= 300) return { txt: "Very Unhealthy", color: "#8e44ad" };
  return { txt: "Hazardous", color: "#7f0000" };
}

export default function AQI({ aqi }) {
  const { mode, glassBackground, hardText } = useContext(ThemeContext);

  if (!aqi) return null;
  const { txt, color } = aqiLabel(aqi.aqi);

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
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Air Quality
        </Typography>
        <Typography variant="h5" sx={{ color }}>
          {aqi.aqi} • {txt}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
          PM2.5: {aqi.components.pm2_5} • PM10: {aqi.components.pm10}
        </Typography>
      </CardContent>
    </Card>
  );
}
