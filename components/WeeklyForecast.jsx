"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import icons from "./WeatherIcons";
import { useContext } from "react";
import { ThemeContext } from "./Providers";

export default function WeeklyForecast({ data = [] }) {
  const { mode, hardText, glassBackground } = useContext(ThemeContext);

  if (!data || !data.length) return null;

  return (
    <Box mt={4}>
      <Typography variant="h6" sx={{ color: hardText, mb: 2, fontWeight: 600 }}>
        5-Day Forecast
      </Typography>

      {/* FLEX WRAPPER FOR PERFECT EQUAL WIDTH */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        {data.map((d) => (
          <Box
            key={d.dt}
            sx={{
              flex: "1 1 calc(20% - 16px)", // ✔ EXACTLY 5 EQUAL CARDS
              minWidth: "150px", // ✔ Responsive on mobile
            }}
          >
            <Card
              sx={{
                background:
                  mode === "dark"
                    ? "rgba(34, 192, 207, 0.12)"
                    : glassBackground,
                backdropFilter: "blur(12px)",
                color: hardText,
                borderRadius: 4,
                height: "180px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "0.25s",
                border:
                  mode === "light"
                    ? "1px solid rgba(0, 150, 136, 0.3)"
                    : "1px solid rgba(34, 192, 207, 0.2)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  background:
                    mode === "dark"
                      ? "rgba(34, 192, 207, 0.18)"
                      : glassBackground,
                },
              }}
            >
              <CardContent
                sx={{
                  p: "12px !important",
                  textAlign: "center",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                {/* Day */}
                <Typography sx={{ fontWeight: 700, opacity: 0.95 }}>
                  {d.day}
                </Typography>

                {/* Icon */}
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    background:
                      mode === "dark"
                        ? "rgba(34, 192, 207, 0.2)"
                        : "rgba(0, 150, 136, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 30 }}>{icons[d.main]}</span>
                </Box>

                {/* Temp */}
                <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                  {d.temp}°C
                </Typography>

                {/* Description — CLAMPED */}
                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.85,
                    textTransform: "capitalize",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {d.desc || ""}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
