"use client";

import { Box, Paper, Typography, IconButton } from "@mui/material";
import { useRef, useState, useEffect, useContext } from "react";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import icons from "./WeatherIcons";
import { ThemeContext } from "./Providers";

export default function HourlySlider({ hourly = [] }) {
  // Hooks MUST be at top level
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { mode, hardText, glassBackground } = useContext(ThemeContext);

  // Check scroll positions
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el = scrollRef.current;
    checkScroll();
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  // Scroll left or right
  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "left" ? -150 : 150,
      behavior: "smooth",
    });
  };

  // NOW safe to conditionally return
  if (!hourly || !hourly.length) return null;

  return (
    <Box mt={3}>
      <Typography variant="h6" sx={{ color: hardText, mb: 1 }}>
        Hourly Forecast
      </Typography>

      <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
        {/* LEFT ARROW */}
        {canScrollLeft && (
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              position: "absolute",
              left: -10,
              zIndex: 20,
              background:
                mode === "dark" ? "rgba(34, 192, 207, 0.12)" : glassBackground,
              color: hardText,
              backdropFilter: "blur(8px)",
              border:
                mode === "light"
                  ? "1px solid rgba(0, 150, 136, 0.3)"
                  : "1px solid rgba(34, 192, 207, 0.2)",
              "&:hover": {
                background:
                  mode === "dark"
                    ? "rgba(34, 192, 207, 0.2)"
                    : "rgba(0, 150, 136, 0.15)",
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
        )}

        {/* SLIDER */}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            scrollBehavior: "smooth",
            py: 1,
            px: 1,
            maxWidth: "100%",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {hourly.map((h) => (
            <Paper
              key={h.dt}
              sx={{
                minWidth: 110,
                p: 1.2,
                textAlign: "center",
                background:
                  mode === "dark"
                    ? "rgba(34, 192, 207, 0.12)"
                    : glassBackground,
                color: hardText,
                borderRadius: 2,
                flexShrink: 0,
                backdropFilter: "blur(8px)",
                border:
                  mode === "light"
                    ? "1px solid rgba(0, 150, 136, 0.3)"
                    : "1px solid rgba(34, 192, 207, 0.2)",
              }}
            >
              <Typography variant="body2">
                {new Date(h.dt * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
              <div style={{ fontSize: 30 }}>{icons[h.main] || "☁️"}</div>
              <Typography sx={{ fontWeight: 700 }}>{h.temp}°</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {h.pop ? `${Math.round(h.pop * 100)}%` : ""}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* RIGHT ARROW */}
        {canScrollRight && (
          <IconButton
            onClick={() => scroll("right")}
            sx={{
              position: "absolute",
              right: -10,
              zIndex: 20,
              background:
                mode === "dark" ? "rgba(34, 192, 207, 0.12)" : glassBackground,
              color: hardText,
              backdropFilter: "blur(8px)",
              border:
                mode === "light"
                  ? "1px solid rgba(0, 150, 136, 0.3)"
                  : "1px solid rgba(34, 192, 207, 0.2)",
              "&:hover": {
                background:
                  mode === "dark"
                    ? "rgba(34, 192, 207, 0.2)"
                    : "rgba(0, 150, 136, 0.15)",
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
