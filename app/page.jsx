"use client";

import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import DarkModeToggle from "@/components/DarkModeToggle";
import CurrentWeather from "@/components/CurrentWeather";
import WeeklyForecast from "@/components/WeeklyForecast";
import WeatherChart from "@/components/WeatherChart";
import SkeletonWeather from "@/components/SkeletonWeather";
import { getWeatherData } from "@/utils/api";

export default function Home() {
  const [current, setCurrent] = useState(null);
  const [weekly, setWeekly] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityOrCoords) => {
    setLoading(true);

    const data = await getWeatherData(cityOrCoords);

    setCurrent(data.current);
    setWeekly(data.weekly);

    setLoading(false);
  };

  // On load → geolocation
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      fetchWeather(coords);
    });
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight={700}>
          Weather Dashboard 🌦️
        </Typography>
        <DarkModeToggle />
      </Box>

      <SearchBar onSearch={(city) => fetchWeather(city)} />

      {loading && <SkeletonWeather />}

      {!loading && current && (
        <>
          <CurrentWeather data={current} />
          <WeatherChart weekly={weekly} />
          <WeeklyForecast data={weekly} />
        </>
      )}
    </Box>
  );
}
