import React from "react";
import { Box, Typography } from "@mui/material";

const ClubNotData = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // 세로 중앙 정렬
        justifyContent: "center", // 가로 중앙 정렬
        height: "200px", // 일정한 높이
      }}
    >
      <Typography variant="h6" color="textSecondary">
        {children}
      </Typography>
    </Box>
  );
};

export default ClubNotData;
