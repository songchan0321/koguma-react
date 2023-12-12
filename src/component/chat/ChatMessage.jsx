import { Avatar, Chip } from "@mui/material";

const ChatMessage = () => {
  return (
    <>
      <Avatar alt="" src={"s"} />
      <Chip
        sx={{
          height: "auto",
          paddingTop: "0.5rem",
          margin: "0.5rem 0rem",
          "& .MuiChip-label": {
            display: "block",
            whiteSpace: "normal",
          },
        }}
        label="This is a chip that has multiple lines.This is a chip that has multiple lines.This is a chip that has multiple lines.This is a chip that has multiple lines."
      />
    </>
  );
};

export default ChatMessage;
