import {
  Avatar,
  List,
  ListItem,
  Typography,
  Snackbar,
  Slide,
} from "@mui/material";
import MessageBubble from "./MessageBubble";
import ChatForm from "./ChatForm";
import { useEffect, useRef } from "react";
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
  newMessageOpen,
  newMessageCloseHandler,
}) => {
  const listRef = useRef(null);
  const navigate = useNavigate();
  const SlideTransition = (props) => {
    return (
      <Slide
        {...props}
        direction="up"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        onClick={() => {
          listRef.current.scrollIntoView({ behavior: "smooth" });
          newMessageCloseHandler();
        }}
      />
    );
  };
  const avatorClickHandler = () => {
    navigate(
      `/member/other/get/${
        room.buyerDTO.id === member.id
          ? room.productDTO.sellerDTO.id
          : room.buyerDTO.id
      }`
    );
  };
  useEffect(() => {
    (async () => {
      if (messages.length > 0) {
        if (
          newMessageOpen &&
          messages[messages.length - 1].senderId !== member.id
        ) {
          return;
        }
        listRef.current.scrollIntoView({ behavior: "instant" });
      }
    })();
  }, [messages]);
  return (
    <>
      <MarginEmpty value={"115px"} />
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          // paddingBottom: "125px",
          paddingBottom: room.id ? "60px" : "125px",
        }}
      >
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
                  justifyContent: msg.type !== "ALERT" ? "none" : "center",
                  alignItems: "flex-start",
                }}
              >
                {msg.type !== "ALERT" && !isOwnMessage && (
                  <Avatar
                    sx={{ border: "solid 1px rgba(120, 120, 120, 0.5)" }}
                    onClick={avatorClickHandler}
                    src={
                      room.buyerDTO.id === member.id
                        ? room.productDTO.sellerDTO.profileURL || ""
                        : room.buyerDTO.profileURL || ""
                    }
                    alt=""
                  />
                )}
                {
                  <MessageBubble
                    msg={msg}
                    isOwnMessage={isOwnMessage}
                    roomId={room.id}
                    member={member}
                  />
                }
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
        <Snackbar
          open={
            newMessageOpen &&
            messages[messages.length - 1].senderId !== member.id
          }
          // onClose={handleClose}
          TransitionComponent={SlideTransition}
          // message="I love snacks"
          message="새로운 채팅을 보냈어요!"
          style={{
            marginBottom: "4rem",
          }}
          // key={state.Transition.name}
        />
        <ChatForm
          roomId={room.id}
          sendTextMessageHandler={sendTextMessageHandler}
          textEvent={textEvent}
          product={product}
        />
      </List>
      <div ref={listRef}></div>
    </>
  );
};

export default ChatMessageList;
