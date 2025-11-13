// components/SearchBar.jsx
"use client";

import { TextField, IconButton, Paper, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useState, useContext } from "react";
import { ThemeContext } from "./Providers";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  const { mode, hardText, glassBackground } = useContext(ThemeContext);

  const submit = () => {
    if (!q || !q.trim()) return;
    onSearch(q.trim());
    setQ("");
  };

  return (
    <Paper
      sx={{
        p: 1,
        borderRadius: 3,
        mb: 2,
        background:
          mode === "dark" ? "rgba(34, 192, 207, 0.12)" : glassBackground,
        backdropFilter: "blur(8px)",
        border:
          mode === "light"
            ? "1px solid rgba(0, 150, 136, 0.3)"
            : "1px solid rgba(34, 192, 207, 0.2)",
      }}
    >
      <TextField
        variant="standard"
        placeholder="Search city (e.g. London)"
        fullWidth
        value={q}
        onChange={(e) => setQ(e.target.value)}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={submit}>
                <SearchIcon sx={{ color: hardText }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ input: { color: hardText, fontSize: 16 } }}
      />
    </Paper>
  );
}
