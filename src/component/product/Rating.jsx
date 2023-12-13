import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function BasicRating({ rating, setRating }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center align the Rating component
        mt: 3, // Add margin top
        mb: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        000님과의 거래는 어떠셨나요?
      </Typography>

      <Rating
        name="simple-controlled"
        value={rating}
        size="large" // Adjust the size as neded
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
    </Box>
  );
}
