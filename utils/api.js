const API_KEY = "818809feb7b93e8c78f5bb5c3f3511b8";

// utils/api.js

// Helper: fetch JSON and throw on error
async function fetchJson(url) {
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) {
    const errMsg = json && (json.message || JSON.stringify(json));
    throw new Error(errMsg || `Request failed: ${res.status}`);
  }
  return json;
}

/**
 * getWeatherByCityOrCoords
 * input: city string OR {lat, lon}
 * returns: { current, hourly, weekly, aqi, uv }
 */
export async function getWeatherByCityOrCoords(input) {
  let lat, lon, cityName;

  if (typeof input === "string") {
    // 1. geocode city name -> get lat/lon
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      input
    )}&limit=1&appid=${API_KEY}`;
    const geo = await fetchJson(geoUrl);
    if (!geo || !geo.length) throw new Error("City not found");
    lat = geo[0].lat;
    lon = geo[0].lon;
    cityName = geo[0].name;
  } else {
    lat = input.lat;
    lon = input.lon;
  }

  // Current weather
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const current = await fetchJson(currentUrl);

  // 5-day / 3-hour forecast
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const forecast = await fetchJson(forecastUrl);

  // Convert forecast -> hourly (next 24 items or as needed) and 5-day daily
  const hourly = forecast.list.slice(0, 24).map((item) => ({
    dt: item.dt,
    temp: Math.round(item.main.temp),
    main: item.weather[0].main,
    icon: item.weather[0].icon,
    pop: item.pop,
  }));

  // daily: pick item at 12:00:00 or approximate per day
  const dailyMap = {};
  forecast.list.forEach((item) => {
    const day = new Date(item.dt * 1000).toISOString().split("T")[0];
    if (!dailyMap[day]) dailyMap[day] = [];
    dailyMap[day].push(item);
  });
  const days = Object.keys(dailyMap).slice(0, 5); // 5-day
  const weekly = days.map((d) => {
    const items = dailyMap[d];
    // compute average or pick midday
    const midday =
      items.find((it) => it.dt_txt && it.dt_txt.includes("12:00:00")) ||
      items[Math.floor(items.length / 2)];
    return {
      dt: midday.dt,
      temp: Math.round(midday.main.temp),
      main: midday.weather[0].main,
      desc: midday.weather[0].description,
      icon: midday.weather[0].icon,
      day: new Date(midday.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      }),
    };
  });

  // Air Quality (requires lat lon)
  const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  let aqi = null;
  try {
    const aqiRes = await fetchJson(aqiUrl);
    if (aqiRes && aqiRes.list && aqiRes.list[0]) {
      aqi = {
        aqi:
          aqiRes.list[0].main.aqi === undefined
            ? null
            : (function () {
                // OpenWeather aqi: 1..5 => convert to 0..500 scale roughly, we map directly for simplicity
                const val = aqiRes.list[0].main.aqi;
                // Map 1-5 -> 50,100,150,200,300 roughly
                const map = { 1: 40, 2: 85, 3: 135, 4: 175, 5: 300 };
                return map[val] || val;
              })(),
        components: aqiRes.list[0].components,
      };
    }
  } catch (e) {
    // ignore AQI errors (not critical)
    aqi = null;
  }

  // UV index: OpenWeather has UV in OneCall; but since OneCall 2.5/3.0 restrictions exist,
  // we can derive UV from current if exists, otherwise omit. We'll attempt OneCall's current if available.
  let uv = null;
  try {
    // Try OneCall 2.5 historical endpoint? To avoid 401 we will attempt a minimal call to "uvi" endpoint (if available)
    // New accounts might not support OneCall; we'll attempt the UV endpoint, but wrap in try/catch.
    const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const uvRes = await fetch(uvUrl);
    if (uvRes.ok) {
      const uvJson = await uvRes.json();
      uv = uvJson.value || null;
    }
  } catch (e) {
    uv = null;
  }

  return {
    current,
    hourly,
    weekly,
    aqi,
    uv,
  };
}
