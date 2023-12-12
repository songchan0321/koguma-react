import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CHAT_EVENT, SocketContext } from "../../context/socket";
import ChatMessage from "../../component/chat/ChatMessage";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { getMemberAPI } from "../../apis/api/member";
import { getChatRoomAPI } from "../../apis/api/chat";
import MessageBubble from "../../component/chat/MessageBubble";
import ChatForm from "../../component/chat/ChatForm";

const GetChatRoom = () => {
  const { roomId, productId } = useParams();
  const socket = useContext(SocketContext);
  const [memberId, setMemberId] = useState(null);
  const [chatRoom, setChatRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const [product, setProduct] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const sendTextMessageHandler = (text) => {
    socket.emit(CHAT_EVENT.SEND_MESSAGE, {
      roomId: roomId,
      //   toId,
      // chatRoom.productDTO.sellerDTO.id === memberId
      //   ? chatRoom.buyerDTO.id
      //   : chatRoom.productDTO.sellerDTO.id,
      token: `${localStorage.getItem("token")}`,
      message: text,
    });
  };
  const textEvent = (flag) => {
    socket.emit(CHAT_EVENT.IS_WRITING, {
      roomId,
      flag,
    });
  };
  useEffect(() => {
    socket.on(CHAT_EVENT.RECEIVED_MESSAGE, (message) => {
      setMessages((prev) => [...prev, message]);
    });
    if (roomId != null) {
      (async () => {
        await getMemberAPI().then((data) => setMemberId(data.id));
        await getChatRoomAPI(roomId).then((data) => setChatRoom(data));
        // await getProductAPI(productId).then((data) => setProduct(data));
      })();
      socket.on(CHAT_EVENT.IS_WRITING, (flag) => {
        setIsWriting(flag);
      });
      socket.on(CHAT_EVENT.MESSAGE_LIST, (messages) => {
        setMessages(messages);
      });
      (async () => {
        await socket.emit(CHAT_EVENT.JOIN_ROOM, {
          roomId: roomId,
          token: `${localStorage.token}`,
        });
      })();
    }
    return () => {
      socket.emit(CHAT_EVENT.LEAVE_ROOM);
      socket.off(CHAT_EVENT.RECEIVED_MESSAGE);
      socket.off(CHAT_EVENT.MESSAGE_LIST);
    };
  }, [roomId]);
  return (
    <List
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        paddingBottom: "60px",
      }}
    >
      {messages.map((msg, index) => {
        const isOwnMessage = memberId === msg.senderId;

        return (
          <ListItem
            key={index}
            style={{
              display: "flex",
              flexDirection: isOwnMessage ? "row-reverse" : "row",
              alignItems: "flex-start",
            }}
          >
            <Avatar
              src={
                isOwnMessage
                  ? "/path/to/own-avatar.png"
                  : "/path/to/other-avatar.png"
              }
              alt=""
            />
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
        sendTextMessageHandler={sendTextMessageHandler}
        textEvent={textEvent}
      />
    </List>
  );
  //   return messages.map((message, idx) => {
  //     return <ChatMessage />;
  //   });
};

export default GetChatRoom;
