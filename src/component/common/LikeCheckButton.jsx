import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function IconCheckboxes() {
  return (
    <div>
      <Checkbox
        color="secondary"
        {...label}
        checked={true}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
      />
    </div>
  );
}
