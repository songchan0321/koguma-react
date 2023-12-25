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
          <CallIcon sx={{ mr: "0.3rem", color: "#9DD84B", pb: "0.2rem" }} />
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CallBubble;
