// app/page.jsx
"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Stack, Alert } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import DarkModeToggle from "@/components/DarkModeToggle";
import CurrentWeather from "@/components/CurrentWeather";
import HourlySlider from "@/components/HourlySlider";
import WeeklyForecast from "@/components/WeeklyForecast";
import WeatherChart from "@/components/WeatherChart";
import SkeletonWeather from "@/components/SkeletonWeather";
import AQI from "@/components/AQI";
import UVBadge from "@/components/UVBadge";
import SavedCities from "@/components/SavedCities";
import { getWeatherByCityOrCoords } from "@/utils/api";

export default function Home() {
  const [data, setData] = useState(null); // { current, hourly, weekly, aqi, uv }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (input) => {
    try {
      setError(null);
      setLoading(true);
      const res = await getWeatherByCityOrCoords(input);
      setData(res);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch weather");
      setLoading(false);
    }
  };

  // on first load try geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      // fallback to a default city
      fetchWeather("Coimbatore");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      (err) => {
        // permission denied -> fallback
        fetchWeather("Coimbatore");
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ width: "100%", boxSizing: "border-box" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
        sx={{ flexWrap: "wrap", gap: 2 }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          Weather • Advanced Dashboard
        </Typography>
        <DarkModeToggle />
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{ width: "100%", boxSizing: "border-box" }}
      >
        <Box flex={1} sx={{ minWidth: 0 }}>
          <SearchBar onSearch={(q) => fetchWeather(q)} />
          <SavedCities onSelect={(q) => fetchWeather(q)} />
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {loading && <SkeletonWeather />}

          {!loading && data && data.current && (
            <>
              <CurrentWeather data={data.current} />
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                mt={2}
                sx={{ width: "100%", boxSizing: "border-box" }}
              >
                <Box flex={1} sx={{ minWidth: 0 }}>
                  <WeatherChart weekly={data.weekly} />
                </Box>
                <Box sx={{ minWidth: { xs: "100%", md: 260 } }}>
                  <AQI aqi={data.aqi} />
                  <UVBadge uv={data.uv} />
                </Box>
              </Stack>

              <HourlySlider hourly={data.hourly} />
              <WeeklyForecast data={data.weekly} />
            </>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
