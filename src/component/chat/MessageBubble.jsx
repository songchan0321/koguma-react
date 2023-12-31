import { Paper, Typography } from "@mui/material";
import { absoulte_timestamp } from "../../apis/utils/timestamp";
import ImageBubble from "./bubble/ImageBubble";
import RequestTransferBubble from "./bubble/RequestTransferBubble";
import TransferBubble from "./bubble/TransferBubble";
import AlertBubble from "./bubble/AlertBubble";
import SharedLocationBubble from "./bubble/SharedLocationBubble";
import PlanBubble from "./bubble/PlanBubble";
import CallBubble from "./bubble/CallBubble";

const MessageBubble = ({ msg, isOwnMessage, roomId, member }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: msg.type === "ALERT" ? "0px" : isOwnMessage ? "10px" : "0",
        marginRight: isOwnMessage ? "0" : "10px",
        textAlign: isOwnMessage ? "right" : "left",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row", // Change to "row" to place timestamp next to Paper
          alignItems: "flex-end",
        }}
      >
        {isOwnMessage && (
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginRight: "5px" }}
          >
            <Typography variant="caption" color={"primary"}>
              {msg.type !== "ALERT" && !msg.readFlag && "안읽음"}
            </Typography>
            <br />
            {msg.type !== "ALERT" && absoulte_timestamp(msg.timestamp)}
          </Typography>
        )}
        {msg.type === "IMAGE" ? (
          <ImageBubble msg={msg} isOwnMessage={isOwnMessage} />
        ) : msg.type === "TRANSFER" ? (
          <TransferBubble
            roomId={roomId}
            msg={msg}
            isOwnMessage={isOwnMessage}
          />
        ) : msg.type === "REQUEST" ? (
          <RequestTransferBubble
            msg={msg}
            isOwnMessage={isOwnMessage}
            roomId={roomId}
          />
        ) : msg.type === "ALERT" ? (
          <AlertBubble contetnt={msg.content} />
        ) : msg.type === "LOCATION" ? (
          <SharedLocationBubble
            content={msg.content}
            isOwnMessage={isOwnMessage}
          />
        ) : msg.type === "PLAN" ? (
          <PlanBubble content={msg.content} isOwnMessage={isOwnMessage} />
        ) : msg.type === "CALL_PENDING" ? (
          <CallBubble content={msg.content} isOwnMessage={isOwnMessage} />
        ) : (
          <Paper
            style={{
              padding: "10px",
              marginLeft: "5px",
              marginRight: "5px",
              maxWidth: "100%",
              alignSelf: isOwnMessage ? "flex-end" : "flex-start",
              backgroundColor: isOwnMessage ? "#D070FB" : "#EAFF4D",
              color: isOwnMessage ? "#ffffff" : "#000000",
              borderRadius: "8px",
              whiteSpace: "pre-wrap",
            }}
          >
            <Typography variant="body2">
              {addLineBreaks(msg.content, 14)}
            </Typography>
          </Paper>
        )}

        {!isOwnMessage && (
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginLeft: "5px" }}
          >
            {msg.type !== "ALERT" && absoulte_timestamp(msg.timestamp)}
          </Typography>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "5px",
          alignItems: isOwnMessage ? "flex-end" : "flex-start",
        }}
      ></div>
    </div>
  );
};

const addLineBreaks = (text, maxLength) => {
  if (
    typeof text !== "string" ||
    typeof maxLength !== "number" ||
    maxLength <= 0
  ) {
    console.error(
      "Invalid input. Please provide a valid string and a positive maxLength."
    );
    return text;
  }

  let result = "";
  let currentLength = 0;

  for (let i = 0; i < text.length; i++) {
    result += text[i];
    currentLength++;

    if (currentLength === maxLength) {
      result += "\n";
      currentLength = 0;
    }
  }

  return result;
};

export default MessageBubble;
