import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CHAT_EVENT, SocketContext } from "../../context/socket";
import ChatMessage from "../../component/chat/ChatMessage";
import {
  Avatar,
  Button,
  Chip,
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
import { addChatRoom, getChatRoomAPI } from "../../apis/api/chat";
import MessageBubble from "../../component/chat/MessageBubble";
import ChatForm from "../../component/chat/ChatForm";
import HorizontalScrollChips from "../../component/chat/HorizontalScrollChips";
import { getProductAPI } from "../../apis/api/Product";

const GetChatRoom = () => {
  const { urlRoomId, productId } = useParams();
  const [roomId, setRoomId] = useState(urlRoomId);
  const navigator = useNavigate();
  if (roomId == null && productId == null) {
    navigator("/product/list");
  }
  //   if (roomId == null && roomId == null) {
  //     navigator(`/product/get/${productId}`);
  //   }
  const socket = useContext(SocketContext);
  const [memberId, setMemberId] = useState(null);
  const [chatRoom, setChatRoom] = useState({});
  const [product, setProduct] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const sendTextMessageHandler = async (text, roomId, toId) => {
    await socket.emit(CHAT_EVENT.SEND_MESSAGE, {
      roomId: roomId,
      toId: toId,
      //   chatRoom.productDTO.sellerDTO.id === memberId
      //     ? chatRoom.buyerDTO.id
      //     : chatRoom.productDTO.sellerDTO.id,
      token: `${localStorage.getItem("token")}`,
      message: text,
    });
  };
  const textEvent = (flag) => {
    socket.emit(CHAT_EVENT.IS_WRITING, {
      roomId,
      flag,
      token: `${localStorage.getItem("token")}`,
    });
  };
  useEffect(() => {
    (async () => {
      await getMemberAPI().then((data) => setMemberId(data.id));
      if (productId != null) {
        await getProductAPI(productId).then((data) => setProduct(data));
      }
    })();
    socket.on(CHAT_EVENT.IS_WRITING, (flag) => {
      setIsWriting(flag);
    });
    socket.on(CHAT_EVENT.MESSAGE_LIST, (messages) => {
      console.log("new message");
      setMessages(messages);
    });
    socket.on(CHAT_EVENT.RECEIVED_MESSAGE, (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);
  useEffect(() => {
    console.log(roomId != null);
    if (roomId != null) {
      console.log("event 걸게");
      (async () => {
        // await getMemberAPI().then((data) => setMemberId(data.id));
        await getChatRoomAPI(roomId).then((data) => setChatRoom(data));
        // await getProductAPI(productId).then((data) => setProduct(data));
      })();
      socket.emit(CHAT_EVENT.JOIN_ROOM, {
        roomId: roomId,
        token: `${localStorage.token}`,
      });
    }
    return () => {
      if (roomId != null) {
        console.log("컴퍼넌트 언마운트");
        socket.emit(CHAT_EVENT.LEAVE_ROOM, {
          roomId: roomId,
          token: `${localStorage.getItem("token")}`,
        });
        socket.off(CHAT_EVENT.IS_WRITING);
        socket.off(CHAT_EVENT.RECEIVED_MESSAGE);
        socket.off(CHAT_EVENT.MESSAGE_LIST);
      }
    };
  }, [roomId]);
  return (
    <List
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        // paddingBottom: "125px",
        paddingBottom: roomId ? "60px" : "125px",
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
            {!isOwnMessage && (
              <Avatar
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
        roomId={roomId}
        sendTextMessageHandler={sendTextMessageHandler}
        textEvent={textEvent}
        product={product}
      />
    </List>
  );
  //   return messages.map((message, idx) => {
  //     return <ChatMessage />;
  //   });
};

export default GetChatRoom;
