// components/CurrentWeather.jsx
"use client";

import {
  Card,
  CardContent,
  Typography,
  Stack,
  Grid,
  Button,
  Box,
} from "@mui/material";
import icons from "./WeatherIcons";
import { useMemo, useContext } from "react";
import { ThemeContext } from "./Providers";

export default function CurrentWeather({ data }) {
  const { mode, glassBackground, cardTextColor, hardText } =
    useContext(ThemeContext);

  // Saved city logic
  const saved = useMemo(() => {
    const list = JSON.parse(localStorage.getItem("saved_cities") || "[]");
    return list.includes(data.name);
  }, [data.name]);

  const toggleSave = () => {
    const list = JSON.parse(localStorage.getItem("saved_cities") || "[]");

    if (saved) {
      const updated = list.filter((c) => c !== data.name);
      localStorage.setItem("saved_cities", JSON.stringify(updated));
    } else {
      if (!list.includes(data.name)) list.push(data.name);
      localStorage.setItem("saved_cities", JSON.stringify(list));
    }
  };

  // Format sunrise & sunset
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Weather stats (to auto-generate UI)
  const stats = [
    {
      label: "Feels Like",
      value: `${Math.round(data.main.feels_like)}°C`,
      icon: "🌡️",
    },
    {
      label: "Humidity",
      value: `${data.main.humidity}%`,
      icon: "💧",
    },
    {
      label: "Wind",
      value: `${data.wind.speed} m/s`,
      icon: "💨",
    },
    {
      label: "Pressure",
      value: `${data.main.pressure} hPa`,
      icon: "🔼",
    },
    {
      label: "Sunrise",
      value: sunrise,
      icon: "🌅",
    },
    {
      label: "Sunset",
      value: sunset,
      icon: "🌇",
    },
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        background:
          mode === "dark"
            ? "linear-gradient(180deg, rgba(34, 192, 207, 0.16), rgba(0, 150, 136, 0.10))"
            : "linear-gradient(180deg, rgba(34, 192, 207, 0.10), rgba(0, 150, 136, 0.05))",
        backdropFilter: "blur(16px)",
        color: hardText,
        border:
          mode === "light"
            ? "1px solid rgba(0, 150, 136, 0.25)"
            : "1px solid rgba(34, 192, 207, 0.25)",
        mb: 3,
      }}
    >
      <CardContent>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-evenly"
          alignItems="center"
          spacing={4}
        >
          {/* LEFT: Icon + Big Temp */}
          <Stack alignItems="center" spacing={1}>
            <div style={{ fontSize: 90 }}>
              {icons[data.weather[0].main] || "☁️"}
            </div>

            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              {Math.round(data.main.temp)}°C
            </Typography>

            <Typography
              variant="h6"
              sx={{ textTransform: "capitalize", opacity: 0.9 }}
            >
              {data.weather[0].description}
            </Typography>

            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              {data.name}, {data.sys.country}
            </Typography>
          </Stack>

          <Box>
            {/* Fixed 3×2 Grid - Always 3 columns */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)", // ⭐ EXACTLY 3 COLUMNS
                gap: 2,
                width: "100%",
                maxWidth: 600,
              }}
            >
              {stats.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    background: glassBackground,
                    borderRadius: 3,
                    p: 2,
                    height: 140, // ⭐ equal height
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow:
                      mode === "dark"
                        ? "0px 2px 10px rgba(0,0,0,0.35)"
                        : "0px 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background:
                        mode === "dark"
                          ? "rgba(255,255,255,0.18)"
                          : "rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography sx={{ fontSize: 13, opacity: 0.85 }}>
                    {item.label}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: hardText,
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* SAVE BUTTON FULL WIDTH */}
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={toggleSave}
                fullWidth
                sx={{
                  py: 1.2,
                  borderRadius: 3,
                  textTransform: "capitalize",
                  fontWeight: 600,
                }}
              >
                {saved ? "Saved" : "Save City"}
              </Button>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
