const API_KEY = "818809feb7b93e8c78f5bb5c3f3511b8";

export async function getWeatherData(city) {
  // 1. Get current weather
  const currentRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  const current = await currentRes.json();

  // 2. Get 5-day (3 hour interval) forecast
  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );
  const forecastData = await forecastRes.json();

  // Convert to daily forecast: pick one item per day (12:00)
  const daily = forecastData.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  const weekly = daily.map((item) => ({
    dt: item.dt,
    temp: Math.round(item.main.temp),
    main: item.weather[0].main,
    icon: item.weather[0].icon,
    day: new Date(item.dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    }),
  }));

  return {
    current,
    weekly,
  };
}
