"use client";

import { Skeleton, Card, CardContent } from "@mui/material";

export default function SkeletonWeather() {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Skeleton variant="text" width={160} height={60} />
        <Skeleton variant="text" width={260} height={40} />
        <Skeleton variant="rectangular" height={160} sx={{ mt: 2 }} />
      </CardContent>
    </Card>
  );
}
