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
import CallIcon from "@mui/icons-material/Call";
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
  const [newMessageOpen, setNewMessageOpen] = useState(false);
  const newMessageCloseHandler = () => {
    setNewMessageOpen(false);
  };
  const sendTextMessageHandler = async ({ text, toId, type }) => {
    // 차단 여부 check true:
    // 나간 여부 check 그냥 emit 후 서버에서 알림 발송 x
    // 차단 여부 check false: emit하기 전에
    // enter_date 설정, emit 후 서버에서 알림 발송
    await enterChatRoomAPI(chatRoom.id).then((data) => {
      if (data.result) {
        (async () => {
          const updateChatroom = await getChatRoomAPI(roomId);
          socket.emit(CHAT_EVENT.SEND_MESSAGE, {
            roomId: chatRoom.id,
            toId: toId,
            type: type,
            token: `${localStorage.getItem("token")}`,
            enter_date:
              updateChatroom.sellerEnterDate < updateChatroom.buyerEnterDate
                ? updateChatroom.buyerEnterDate
                : updateChatroom.sellerEnterDate,
            message: text,
          });
        })();
      } else {
        socket.emit(CHAT_EVENT.SEND_MESSAGE, {
          roomId: chatRoom.id,
          toId: toId,
          type: type,
          token: `${localStorage.getItem("token")}`,
          message: text,
        });
      }
    });
  };
  const textEvent = (flag, roomId) => {
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
      setNewMessageOpen(true);
      setTimeout(() => {
        setNewMessageOpen(false);
      }, 2000);
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
      <div
        style={{
          position: "fixed",
          right: "0.7rem",
          top: "0.9rem",
          zIndex: 1003,
        }}
      >
        <CallIcon
          sx={{ fontSize: "1.8rem" }}
          onClick={() =>
            (window.location.href = `tel:${
              chatRoom.buyerDTO.id === chatRoom.id
                ? chatRoom.productDTO.sellerDTO.phone
                : chatRoom.buyerDTO.phone
            }`)
          }
        />
      </div>
      {/* <div
        style={{
          position: "fixed",
          left: "52%",
          top: "1rem",
          zIndex: 1005,
        }}
      >
        <Chip
          icon={<ThermostatIcon sx={{ fontSize: "0.8rem" }} />}
          color="primary"
          sx={{
            // pl: "-0.5rem",
            width: "5rem",
            height: "1.5rem",
            fontSize: "0.7rem",
          }}
          label={
            (chatRoom.buyerDTO.id === member.id
              ? chatRoom.productDTO.sellerDTO.score
              : chatRoom.buyerDTO.score) + "°C"
          }
        />
      </div> */}
      <TopBar>
        {chatRoom.buyerDTO.id === member.id
          ? chatRoom.productDTO.sellerDTO.nickname
          : chatRoom.buyerDTO.nickname}
        &nbsp;
        <Chip
          // icon={<ThermostatIcon sx={{ fontSize: "0.7rem" }} />}
          color="primary"
          sx={{
            // pl: "-0.5rem",
            width: "3.5rem",
            height: "1.0rem",
            fontSize: "0.6rem",
          }}
          label={
            (chatRoom.buyerDTO.id === member.id
              ? chatRoom.productDTO.sellerDTO.score
              : chatRoom.buyerDTO.score) + "°C"
          }
        />
      </TopBar>
      <MarginEmpty />
      <ChatHeader
        product={chatRoom.productDTO}
        member={member}
        price={chatRoom.price}
      />
      <ChatMessageList
        textEvent={textEvent}
        sendTextMessageHandler={sendTextMessageHandler}
        newMessageOpen={newMessageOpen}
        newMessageCloseHandler={newMessageCloseHandler}
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
