"use client";

import { Card, CardContent, Typography, Stack, Grid } from "@mui/material";
import icons from "./WeatherIcons";

export default function CurrentWeather({ data }) {
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card
      elevation={0}
      sx={{
        mb: 3,
        borderRadius: 5,
        p: 2,
        background: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(15px)",
        color: "white",
      }}
    >
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <div style={{ fontSize: 80 }}>
            {icons[data.weather[0].main] || "☁️"}
          </div>

          <Typography variant="h2" fontWeight={700}>
            {Math.round(data.main.temp)}°C
          </Typography>

          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            {data.weather[0].description}
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            {data.name}, {data.sys.country}
          </Typography>

          {/* Extra details */}
          <Grid container spacing={3} mt={1} justifyContent="center">
            <Grid item>
              <Typography>
                🌡 Feels like: {Math.round(data.main.feels_like)}°C
              </Typography>
            </Grid>
            <Grid item>
              <Typography>💧 Humidity: {data.main.humidity}%</Typography>
            </Grid>
            <Grid item>
              <Typography>💨 Wind: {data.wind.speed} m/s</Typography>
            </Grid>
            <Grid item>
              <Typography>🔼 Pressure: {data.main.pressure} hPa</Typography>
            </Grid>
            <Grid item>
              <Typography>🌅 Sunrise: {sunrise}</Typography>
            </Grid>
            <Grid item>
              <Typography>🌇 Sunset: {sunset}</Typography>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
