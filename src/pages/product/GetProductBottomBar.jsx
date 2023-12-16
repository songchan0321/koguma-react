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
import { formatMoney } from "../../apis/services/product";

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

const GetProductBottomBar = ({ data, isMine }) => {
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
            <span>{formatMoney(data.price)}원</span>
          </div>
          {isMine ? (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => navigator(`/product/suggest/list`)}
            >
              가격제안 1명
            </Button>
          ) : (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => navigator(`/product/suggest/${data.id}`)}
            >
              가격 제안하기
            </Button>
          )}
          {isMine ? (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => navigator(`/chat/get/new/${data.id}`)}
            >
              대화중인 채팅방 1
            </Button>
          ) : (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => navigator(`/chat/get/new/${data.id}`)}
            >
              채팅하기
            </Button>
          )}
        </StyledCardActions>
      </Paper>
    </ThemeProvider>
  );
};

export default GetProductBottomBar;
