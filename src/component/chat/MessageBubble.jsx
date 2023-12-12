import { Paper, Typography } from "@mui/material";
import { absoulte_timestamp } from "../../apis/utils/timestamp";

const MessageBubble = ({ msg, isOwnMessage }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: isOwnMessage ? "10px" : "0",
        marginRight: isOwnMessage ? "0" : "10px",
        textAlign: isOwnMessage ? "right" : "left",
      }}
    >
      {/* <Message /> */}
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
              {!msg.readFlag && "안읽음"}
            </Typography>
            <br />
            {absoulte_timestamp(msg.timestamp)}
          </Typography>
        )}
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
          }}
        >
          <Typography variant="body2">{msg.content}</Typography>
        </Paper>
        {!isOwnMessage && (
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginLeft: "5px" }}
          >
            {absoulte_timestamp(msg.timestamp)}
          </Typography>
        )}
        {/* Display timestamp next to Paper */}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "5px",
          alignItems: isOwnMessage ? "flex-end" : "flex-start",
        }}
      >
        {isOwnMessage && (
          <Typography
            variant="caption"
            color={msg.readFlag ? "textSecondary" : "primary"}
          >
            {!msg.readFlag && "안읽음"}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
