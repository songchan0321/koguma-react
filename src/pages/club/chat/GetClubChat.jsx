import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./Chatcss.css";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";

const socket = io.connect(process.env.REACT_APP_GROUP_CHAT_URL);

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 8px;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 8px;
  margin: 10px;
  border-radius: 15px;
  background-color: ${(props) => (props.isOwnMessage ? "#D070FB" : "#E7E3E3")};
  color: ${(props) => (props.isOwnMessage ? "#fff" : "#000")};
  align-self: ${(props) => (props.isOwnMessage ? "flex-end" : "flex-start")};
  font-size: 18px;
  font-weight: 100;
`;

const NicknameContainer = styled.div`
  align-self: flex-start;
  margin-left: 10px;
  margin-bottom: 2px;
  color: #555;
  font-size: 12px;
  font-weight: 100;
`;

const GetClubChat = ({ clubId, clubMember }) => {
  const [messages, setMessages] = useState([]);
  const [clubMemberId, setClubMemberId] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    setNickname(clubMember.nickname);
    setClubMemberId(clubMember.id);

    const handleChatMessage = (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      scrollToBottom();
    };

    socket.on("chat message", handleChatMessage);

    socket.emit("join club", clubId, clubMember.id);
    socket.emit("get messages", clubId);

    socket.on("all messages", (messages) => {
      setMessages(messages);
      scrollToBottom();
      console.log(`react.socket.on all message`, new Date());
    });

    return () => {
      socket.off("chat message", handleChatMessage);
    };
  }, [clubId, clubMember.id]);

  const handleSendMessage = () => {
    sendMessage(inputMessage);
    setInputMessage("");
    scrollToBottom();

    console.log(`react.handleSendMessage`, new Date());
  };

  const sendMessage = (text) => {
    socket.emit("chat message", {
      clubMemberId,
      nickname: nickname,
      text,
      clubId,
    });
    scrollToBottom();
    console.log(`react.const sendMessage`, new Date());
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div style={{ flex: 1, overflowY: "auto", marginBottom: "30px" }}>
          {/* 메시지 히스토리 영역 */}
          {messages.map((msg, index) => (
            <MessageContainer key={index}>
              {msg.nickname !== nickname && (
                <NicknameContainer>{msg.nickname}</NicknameContainer>
              )}
              <MessageBubble isOwnMessage={msg.nickname === nickname}>
                {msg.text}
              </MessageBubble>
              <div ref={messagesContainerRef}></div>
            </MessageContainer>
          ))}
        </div>
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
          {/* 메시지 입력 창 영역 */}
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              height: "60px",
              backgroundColor: "#E7E3E3",
            }}
          >
            <Divider sx={{ height: 40, m: 0.5 }} orientation="vertical" />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="메시지 입력하세요."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              inputProps={{ "aria-label": "search google maps" }}
            />
            <Divider sx={{ height: 40, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="secondary"
              sx={{ p: "10px" }}
              aria-label="directions"
              onClick={handleSendMessage}
            >
              <SendIcon></SendIcon>
            </IconButton>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default GetClubChat;
