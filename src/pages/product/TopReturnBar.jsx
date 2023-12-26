import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Badge, Paper } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// 테마 생성
const theme = createTheme({});

const TopReturnBar = ({ title }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // 뒤로가기 동작 실행
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px",
        }}
        elevation={3}
      >
        <div>
          <IconButton aria-label="back" onClick={handleBackClick}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </div>
        <div
          style={{
            flex: 1, // 가능한 많은 공간을 차지하도록 함
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" component="h3">
            {title}
          </Typography>
        </div>
        <div></div>
      </Paper>
    </ThemeProvider>
  );
};

export default TopReturnBar;
