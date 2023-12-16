import { Avatar, List, ListItem, Typography } from "@mui/material";
import MessageBubble from "./MessageBubble";
import ChatForm from "./ChatForm";
import { useEffect, useState } from "react";
import { Margin } from "@mui/icons-material";
import MarginEmpty from "../payment/MarginEmpty";
import { useNavigate } from "react-router-dom";

const ChatMessageList = ({
  isWriting,
  messages,
  member,
  room,
  sendTextMessageHandler,
  product,
  textEvent,
}) => {
  const [viewFlag, setViewFlag] = useState(false);
  const navigate = useNavigate();
  const avatorClickHandler = () => {
    navigate(
      `/member/other/get/${
        room.buyerDTO.id === member.id
          ? room.productDTO.sellerDTO.id
          : room.buyerDTO.id
      }`
    );
  };
  const viewMessageList = () => {
    setViewFlag(true);
  };
  useEffect(() => {
    (async () => {
      if (!viewFlag || messages[messages.length - 1].senderId === member.id) {
        window.scrollTo(0, document.body.scrollHeight);
      }
      viewMessageList();
    })();
  }, [messages]);
  return (
    <>
      <MarginEmpty value={"115px"} />
      <List
        style={{
          opacity: !viewFlag ? 0 : 1,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          // paddingBottom: "125px",
          paddingBottom: room.id ? "60px" : "125px",
        }}
      >
        {console.log(messages)}
        {messages
          .filter((msg) => {
            return (
              msg.timestamp >=
              (room.buyerDTO.id === member.id
                ? room.buyerEnterDate
                : room.sellerEnterDate)
            );
          })
          .map((msg, index) => {
            const isOwnMessage = member.id === msg.senderId;

            return (
              <ListItem
                key={index}
                style={{
                  display: "flex",
                  flexDirection: isOwnMessage ? "row-reverse" : "row",
                  alignItems: "flex-start",
                }}
              >
                {!isOwnMessage && (
                  <Avatar
                    onClick={avatorClickHandler}
                    src={
                      isOwnMessage
                        ? "/path/to/own-avatar.png"
                        : "/path/to/other-avatar.png"
                    }
                    alt=""
                  />
                )}

                <MessageBubble msg={msg} isOwnMessage={isOwnMessage} />
              </ListItem>
            );
          })}
        {isWriting && (
          <div
            style={{
              position: "fixed",
              bottom: 60,
              width: "100%",
              height: "25px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(200, 200, 200, 0.7)", // Gray color with 0.7 opacity
              zIndex: 1, // Ensure it stays above other content
            }}
          >
            <Typography variant="body2" color="primary">
              상대방이 채팅을 입력중이에요...
            </Typography>
          </div>
        )}
        <ChatForm
          roomId={room.id}
          sendTextMessageHandler={sendTextMessageHandler}
          textEvent={textEvent}
          product={product}
        />
      </List>
    </>
  );
};

export default ChatMessageList;
