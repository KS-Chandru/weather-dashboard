"use client";

import { Card, CardContent, Typography, Stack } from "@mui/material";
import icons from "./WeatherIcons";

export default function CurrentWeather({ data }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h3">{Math.round(data.main.temp)}°C</Typography>
          <Typography variant="h5">{data.weather[0].main}</Typography>
          <div style={{ fontSize: 50 }}>
            {icons[data.weather[0].main] || "☁️"}
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
