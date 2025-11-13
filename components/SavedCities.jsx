// components/SavedCities.jsx
"use client";

import { useEffect, useState, useContext } from "react";
import { Stack, Chip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeContext } from "./Providers";

export default function SavedCities({ onSelect }) {
  const [cities, setCities] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("saved_cities") || "[]");
    }
    return [];
  });
  const { mode, glassBackground, hardText } = useContext(ThemeContext);

  const remove = (city) => {
    const filtered = cities.filter((c) => c !== city);
    localStorage.setItem("saved_cities", JSON.stringify(filtered));
    setCities(filtered);
  };

  if (!cities.length) return null;

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
      {cities.map((c) => (
        <Chip
          key={c}
          label={c}
          onClick={() => onSelect(c)}
          onDelete={() => remove(c)}
          sx={{
            background:
              mode === "dark" ? "rgba(34, 192, 207, 0.12)" : glassBackground,
            color: hardText,
            border:
              mode === "light"
                ? "1px solid rgba(0, 150, 136, 0.3)"
                : "1px solid rgba(34, 192, 207, 0.2)",
            backdropFilter: "blur(8px)",
          }}
          deleteIcon={<DeleteIcon sx={{ color: hardText }} />}
        />
      ))}
    </Stack>
  );
}
