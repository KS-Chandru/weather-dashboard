"use client";

import { Card, CardContent, Typography, Grid } from "@mui/material";
import icons from "./WeatherIcons";

export default function WeeklyForecast({ data }) {
  return (
    <Grid container spacing={2} mt={2}>
      {data.map((d) => (
        <Grid item xs={6} sm={4} md={2} key={d.dt}>
          <Card
            elevation={3}
            sx={{
              borderRadius: 4,
              background: "rgba(255,255,255,0.28)",
              backdropFilter: "blur(10px)",
              p: 2,
              textAlign: "center",
              color: "white",
            }}
          >
            <CardContent>
              <Typography fontWeight={700} mb={1}>
                {d.day}
              </Typography>
              <div style={{ fontSize: 42 }}>{icons[d.main]}</div>
              <Typography fontSize={20} mt={1}>
                {d.temp}°C
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
