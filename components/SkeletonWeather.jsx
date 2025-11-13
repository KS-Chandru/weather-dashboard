// components/SkeletonWeather.jsx
"use client";

import { Card, CardContent, Skeleton, Stack } from "@mui/material";

export default function SkeletonWeather() {
  return (
    <Card sx={{ mb: 2, background: "rgba(255,255,255,0.03)" }}>
      <CardContent>
        <Stack spacing={1}>
          <Skeleton variant="rounded" width={120} height={40} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rectangular" height={160} />
        </Stack>
      </CardContent>
    </Card>
  );
}
