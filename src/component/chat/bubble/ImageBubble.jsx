import { Avatar } from "@mui/material";

const ImageBubble = ({ msg, isOwnMessage }) => {
  return (
    <a href={msg.content} target="_blank" rel="noopener noreferrer">
      <Avatar
        alt=""
        variant="square"
        src={`${msg.content}`}
        sx={{
          ml: isOwnMessage ? "0" : "0.5rem",
          width: "10rem",
          height: "10rem",
          border: "1px solid rgba(0, 0, 0, 0.1)", // 테두리 스타일 및 색상 지정
        }}
      />
    </a>
  );
};

export default ImageBubble;
