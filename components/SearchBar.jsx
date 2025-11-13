"use client";

import { TextField, Button, Stack } from "@mui/material";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  return (
    <Stack direction="row" spacing={2} mb={3}>
      <TextField
        fullWidth
        label="Search city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button variant="contained" onClick={() => onSearch(city)}>
        Search
      </Button>
    </Stack>
  );
}
