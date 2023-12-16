import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CHAT_EVENT, SocketContext } from "../../context/socket";
import { getMemberAPI } from "../../apis/api/member";
import { enterChatRoomAPI, getChatRoomAPI } from "../../apis/api/chat";
import { getProductAPI } from "../../apis/api/Product";
import LoadingProgress from "../../component/common/LoadingProgress";
import ChatMessageList from "../../component/chat/ChatMessageList";
import ChatHeader from "../../component/chat/ChatHeader";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import { Chip } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import Back from "../../component/common/Back";
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
    // 차단 여부 check true:
    // 나간 여부 check 그냥 emit 후 서버에서 알림 발송 x
    // 차단 여부 check false: emit하기 전에
    // enter_date 설정, emit 후 서버에서 알림 발송
    await enterChatRoomAPI(roomId).then((data) => {
      if (data.result) {
        (async () => {
          const updateChatroom = await getChatRoomAPI(roomId);
          socket.emit(CHAT_EVENT.SEND_MESSAGE, {
            roomId: roomId,
            toId: toId,
            token: `${localStorage.getItem("token")}`,
            enter_date:
              updateChatroom.buyerDTO.id === member.id
                ? updateChatroom.sellerEnterDate
                : updateChatroom.buyerEnterDate,
            message: text,
          });
        })();
      } else {
        socket.emit(CHAT_EVENT.SEND_MESSAGE, {
          roomId: roomId,
          toId: toId,
          token: `${localStorage.getItem("token")}`,
          message: text,
        });
      }
    });
    // setTimeout(() => {

    // }, 500);
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
      console.log("MESSAGE_LIST EVENT!");
      setMessages(messages);
    });
    socket.on(CHAT_EVENT.RECEIVED_MESSAGE, (message) => {
      console.log("RECEIVED_MESSAGE EVENT!");
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });
  }, []);
  useEffect(() => {
    if (chatRoom != null) {
      socket.emit(CHAT_EVENT.JOIN_ROOM, {
        roomId: roomId,
        token: `${localStorage.token}`,
      });
    }
  }, [chatRoom]);
  useEffect(() => {
    try {
      (async () => {
        await getChatRoomAPI(roomId).then((data) => setChatRoom(data));
      })();
    } catch (err) {
      alert(err.content);
    }

    return () => {
      console.log("컴퍼넌트 언마운트");
      socket.emit(CHAT_EVENT.LEAVE_ROOM, {
        roomId: roomId,
        token: `${localStorage.getItem("token")}`,
      });
      socket.off(CHAT_EVENT.IS_WRITING);
      socket.off(CHAT_EVENT.RECEIVED_MESSAGE);
      socket.off(CHAT_EVENT.MESSAGE_LIST);
    };
  }, [roomId]);
  return !member || !chatRoom ? (
    <LoadingProgress />
  ) : (
    <>
      <Back url={`/chat/list`} />
      <div style={{ position: "fixed", right: 6, top: 12, zIndex: 1005 }}>
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
        room={chatRoom}
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
