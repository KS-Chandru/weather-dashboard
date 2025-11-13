"use client";

import { TextField, InputAdornment, IconButton, Paper } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  return (
    <Paper
      elevation={6}
      sx={{
        p: 1.5,
        borderRadius: 5,
        mb: 4,
        background: "rgba(255,255,255,0.35)",
        backdropFilter: "blur(12px)",
      }}
    >
      <TextField
        fullWidth
        variant="standard"
        placeholder="Search for a city..."
        InputProps={{
          disableUnderline: true,
          sx: { fontSize: 18, px: 2 },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => onSearch(city)}
                sx={{
                  background: "#1976d2",
                  color: "white",
                  "&:hover": { background: "#1259a5" },
                }}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </Paper>
  );
}
