import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

export default function SearchSlider({ searchRange, setSearchRange }) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Temperature"
        value={searchRange}
        onChange={setSearchRange}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        color="secondary"
        step={1}
        marks
        min={2}
        max={5}
      />
    </Box>
  );
}
