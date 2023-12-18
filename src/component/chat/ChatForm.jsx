import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import ChatPlusButton from "./ChatPlusButton";
const ChatForm = ({
  roomId,
  sendTextMessageHandler,
  textEvent,
  newSendTextMessageHandler,
  product,
}) => {
  const [text, setText] = useState("");
  useEffect(() => {
    if (textEvent) {
      if (text === "") {
        textEvent(false);
      } else {
        textEvent(true);
      }
    }
  }, [text]);
  const onClickHandler = () => {
    if (text !== "") {
      if (roomId != null) {
        sendTextMessageHandler(text, roomId);
      } else {
        newSendTextMessageHandler(text, product);
      }
      setText("");
    }
  };
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Paper
        // component="form"
        sx={{
          // p: "2px 4px",
          display: "flex",
          alignItems: "center",
          height: "60px",
          width: "100%",
          backgroundColor: "#E7E3E3",
        }}
      >
        <ChatPlusButton
          sendTextMessageHandler={sendTextMessageHandler}
          roomId={roomId}
          product={product}
        />
        <Divider sx={{ height: 40, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="메시지 입력하세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
          inputProps={{ "aria-label": "search google maps" }}
        />
        <Divider sx={{ height: 40, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="secondary"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={onClickHandler}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </div>
  );
};
export default ChatForm;
