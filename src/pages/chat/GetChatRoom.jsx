import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CHAT_EVENT, SocketContext } from "../../context/socket";
import { getMemberAPI } from "../../apis/api/member";
import { getChatRoomAPI } from "../../apis/api/chat";
import { getProductAPI } from "../../apis/api/Product";
import LoadingProgress from "../../component/common/LoadingProgress";
import ChatMessageList from "../../component/chat/ChatMessageList";
import ChatHeader from "../../component/chat/ChatHeader";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import { Chip } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
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
  // const [memberId, setMemberId] = useState(null);
  const [member, setMember] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
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
  // useEffect(() => {
  //   (async () => {
  //     console.log("scroll event");
  //     window.scrollTo(0, document.body.scrollHeight);
  //   })();
  // }, [messages]);
  useEffect(() => {
    (async () => {
      await getMemberAPI().then((data) => setMember(data));
      if (productId != null) {
        await getProductAPI(productId).then((data) => setProduct(data));
      }
    })();
    socket.on(CHAT_EVENT.IS_WRITING, (flag) => {
      setIsWriting(flag);
    });
    socket.on(CHAT_EVENT.MESSAGE_LIST, (messages) => {
      setMessages(messages);
    });
    socket.on(CHAT_EVENT.RECEIVED_MESSAGE, (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);
  useEffect(() => {
    if (roomId != null) {
      (async () => {
        await getChatRoomAPI(roomId).then((data) => setChatRoom(data));
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
  return !member || !chatRoom ? (
    <LoadingProgress />
  ) : (
    <>
      <div style={{ position: "fixed", right: 6, top: 12, zIndex: 2000000 }}>
        {console.log(chatRoom)}
        <Chip
          icon={<ThermostatIcon fontSize="small" />}
          color="primary"
          label={
            (chatRoom.buyerDTO.id === member.id
              ? chatRoom.productDTO.sellerDTO.score
              : chatRoom.buyerDTO.score) + "°C"
          }
        />
      </div>
      <TopBar>
        {chatRoom.buyerDTO.id === member.id
          ? chatRoom.productDTO.sellerDTO.nickname
          : chatRoom.buyerDTO.nickname}
      </TopBar>
      <MarginEmpty />
      <ChatHeader product={chatRoom.productDTO} />
      <ChatMessageList
        textEvent={textEvent}
        sendTextMessageHandler={sendTextMessageHandler}
        member={member}
        product={product}
        roomId={roomId}
        messages={messages}
        isWriting={isWriting}
      />
    </>
  );
  //   return messages.map((message, idx) => {
  //     return <ChatMessage />;
  //   });
};

export default GetChatRoom;
