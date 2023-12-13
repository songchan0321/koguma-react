import { useState } from "react";
import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ListCategoryForSelect = () => {
  const [community, setCommunity] = React.useState("");

  const handleChange = (event) => {
    setCommunity(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          카테고리를 선택해주세요.
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={community}
          label="community"
          onChange={handleChange}
        >
          <MenuItem value={10}>동네소식</MenuItem>
          <MenuItem value={20}>동네맛집</MenuItem>
          <MenuItem value={30}>동네질문</MenuItem>
          <MenuItem value={40}>취미생활</MenuItem>
          <MenuItem value={50}>일상</MenuItem>
          <MenuItem value={60}>분실/실종</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ListCategoryForSelect;
