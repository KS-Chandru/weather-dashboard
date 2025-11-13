"use client";

import { Card, CardContent, Typography, Grid } from "@mui/material";
import icons from "./WeatherIcons";

export default function WeeklyForecast({ data }) {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          5-Day Forecast
        </Typography>

        <Grid container spacing={2}>
          {data.map((d) => (
            <Grid item xs={6} sm={3} md={2} key={d.dt}>
              <Typography>{d.day}</Typography>
              <div style={{ fontSize: 40 }}>{icons[d.main]}</div>
              <Typography>{d.temp}°C</Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
