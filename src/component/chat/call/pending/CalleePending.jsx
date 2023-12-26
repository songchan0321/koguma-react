import React from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";

const CalleePending = ({
  roomId,
  sourceMember,
  clickHandler,
  closeHandler,
}) => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor:
            "rgba(0, 0, 0)" /* 검은색 배경, 마지막 값이 투명도 조절 */,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2999 /* 다른 요소들보다 위에 나타나도록 설정 */,
        }}
      >
        <Stack
          spacing={1}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ width: "7.5rem", height: "7.5rem" }}
            src={sourceMember?.profileURL}
          ></Avatar>
          <Typography variant="h6" sx={{ textAlign: "center", color: "white" }}>
            {sourceMember?.nickname}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ textAlign: "center", color: "#adb5bd" }}
          >
            통화해요.
          </Typography>
        </Stack>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "3rem", // 원하는 만큼 조절
          left: 0,
          width: "100%",
          zIndex: 3000,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Avatar
            sx={{ width: "4rem", height: "4rem", backgroundColor: "red" }}
          >
            <IconButton onClick={closeHandler}>
              <CloseOutlinedIcon />
            </IconButton>
          </Avatar>
          <span style={{ fontSize: "0.8rem", color: "#adb5bd" }}>거절</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <Avatar
            sx={{ width: "4rem", height: "4rem", backgroundColor: "green" }}
          >
            <IconButton onClick={clickHandler}>
              <CheckOutlinedIcon />
            </IconButton>
          </Avatar>
          <span style={{ fontSize: "0.8rem", color: "#adb5bd" }}>수락</span>
        </div>
      </div>
    </>
  );
};

export default CalleePending;
