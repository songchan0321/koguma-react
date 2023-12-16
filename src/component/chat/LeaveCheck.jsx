import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import { forwardRef, useContext, useState } from "react";
import { SocketContext } from "../../context/socket";
import { leaveChatRoomAPI } from "../../apis/api/chat";
import { useNavigate } from "react-router-dom";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LeaveCheck = ({ open, handleClose, roomId }) => {
  const navigator = useNavigate();
  const socket = useContext(SocketContext);
  const leaveClickHandler = () => {
    (async () => {
      try {
        await leaveChatRoomAPI(roomId);
        navigator(`/chat/list`, { replace: true });
      } catch (err) {
        alert(err.content);
      }
    })();
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"채팅방 나가기"}</DialogTitle>
      <DialogContent>
        {"채팅방에 나가면 이전에 나누었던 메시지는 다신 볼 수가 없어요..."}
      </DialogContent>
      <DialogContent sx={{ color: "#ff0234" }}>
        {
          "채팅방에 나가도 메시지를 계속 보낸다면 회원 차단 기능을 이용해보세요!"
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={leaveClickHandler} color="error">
          나가기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeaveCheck;
