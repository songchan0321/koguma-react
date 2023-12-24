import { Card, CardContent, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import React from "react";

const CallBubble = ({ content, isOwnMessage }) => {
  return (
    <Card
      sx={{
        maxWidth: "12.5rem",
        ml: isOwnMessage ? "0" : "0.5rem",
        backgroundColor: "#F8F8FA",
      }}
    >
      <CardContent sx={{ height: "3.5rem", width: "11.5rem" }}>
        <Typography gutterBottom variant="subtitle1" component="div">
          <CallIcon sx={{ mr: "0.3rem", color: "#9DD84B" }} />
          {content}
        </Typography>
        {/* 날짜: {`${year}년 ${month}월 ${day}일`}
    <Typography variant="body1" color="text.secondary"></Typography>
    <Typography variant="body1" color="text.secondary">
      시간: {`${formatTimeTo12Hour(time)}`}
    </Typography> */}
      </CardContent>
      {/* <Button
    variant="contained"
    fullWidth
    onClick={onClickHandler}
    sx={{
      backgroundColor: "#D070FB",
      "&:hover": {
        backgroundColor: "#D070FB", // hover 시 배경색을 빨간색으로 변경
      },
      "&:active": {
        backgroundColor: "#D070FB", // 클릭 시 배경색을 파란색으로 변경
      },
    }}
  >
    장소 보기
  </Button> */}
    </Card>
  );
};

export default CallBubble;
