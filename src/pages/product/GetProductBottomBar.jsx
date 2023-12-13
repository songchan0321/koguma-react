import React, { useState } from "react";
import { Button } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { Badge, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LikeCheckButton from "../../component/common/LikeCheckButton";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";

// 테마 생성
const theme = createTheme({
  palette: {
    primary: {
      main: "#D070FB", // 보라색으로 변경
    },
  },
});

const StyledCardActions = styled(CardActions)({
  display: "flex",
  justifyContent: "space-between",
});

const GetProductBottomBar = ({ productId }) => {
  const navigator = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <StyledCardActions>
          <div>
            <IconButton aria-label="add to favorites">
              <LikeCheckButton />
            </IconButton>
            <span>상품 가격 : 10000원</span>
          </div>
          <Button
            color="secondary"
            variant="contained"
            sx={{}}
            onClick={() => navigator(`/product/suggest/${productId}`)}
          >
            가격제안
          </Button>
          <Button
            color="secondary"
            variant="contained"
            sx={{}}
            onClick={() => navigator(`/chat/get/new/${productId}`)}
          >
            채팅하기
          </Button>
        </StyledCardActions>
      </Paper>
    </ThemeProvider>
  );
};

export default GetProductBottomBar;
