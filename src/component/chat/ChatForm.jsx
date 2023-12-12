import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import { useEffect, useState } from "react";
const ChatForm = ({ sendTextMessageHandler, textEvent }) => {
  const [text, setText] = useState("");
  useEffect(() => {
    if (text === "") {
      textEvent(false);
    } else {
      textEvent(true);
    }
  }, [text]);
  const onClickHandler = () => {
    if (text !== "") {
      sendTextMessageHandler(text);
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
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <AddIcon />
        </IconButton>
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
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </div>
  );
};
export default ChatForm;