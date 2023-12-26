import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CALL_EVENT, CHAT_EVENT, SocketContext } from "../../context/socket";
import { getMemberAPI, getReverseBlockAPI } from "../../apis/api/member";
import {
  checkEnterRoomByMemberAPI,
  enterChatRoomAPI,
  getChatRoomAPI,
} from "../../apis/api/chat";
import LoadingProgress from "../../component/common/LoadingProgress";
import ChatMessageList from "../../component/chat/ChatMessageList";
import ChatHeader from "../../component/chat/ChatHeader";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import { Chip } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import Back from "../../component/common/Back";
import BottomBar from "../../component/common/BottomBar";
const GetChatRoom = () => {
  const { urlRoomId } = useParams();
  const { state } = useLocation();
  const [roomId, setRoomId] = useState(urlRoomId);
  const navigator = useNavigate();
  if (roomId == null) {
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
  const sendTextMessageHandler_temp = async ({ text, type, toId }) => {
    console.log("sendTextMessageHandler_temp()");
    // 판매자가 나를 차단하냐?
    const block_flag = await getReverseBlockAPI(
      chatRoom.buyerDTO.id === member.id
        ? chatRoom.productDTO.sellerDTO.id
        : chatRoom.buyerDTO.id
    );
    const exist_flag = await checkEnterRoomByMemberAPI(
      chatRoom.id,
      chatRoom.buyerDTO.id === member.id
        ? chatRoom.productDTO.sellerDTO.id
        : chatRoom.buyerDTO.id
    );
    // 로그인한 회원(구매 예정자)이 채팅방이 리얼 처음인가
    await getChatRoomAPI(roomId)
      .then((room) => {
        if (block_flag == null) return enterChatRoomAPI(room.id);
        return room;
      })
      .then((room) => {
        socket.emit(CHAT_EVENT.SEND_MESSAGE, {
          roomId: room.id,
          flag: block_flag == null ? false : true,
          type: type,
          token: `${localStorage.getItem("token")}`,
          enter_date: exist_flag
            ? null
            : room.buyerDTO.id === member.id
            ? room.sellerEnterDate
            : room.buyerEnterDate,
          message: text,
        });
      });
  };

  const textEvent = (flag, roomId) => {
    socket.emit(CHAT_EVENT.IS_WRITING, {
      roomId,
      flag,
      token: `${localStorage.getItem("token")}`,
    });
  };
  useEffect(() => {
    (async () => {
      await getMemberAPI().then((data) => setMember(data));
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
    <>
      <LoadingProgress />
      <BottomBar />
    </>
  ) : (
    <>
      <Back
        url={state?.productId ? `/chat/list/${state.productId}` : `/chat/list`}
      />
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
          onClick={() => {
            sendTextMessageHandler_temp({
              text: "전화를 요청했어요!",
              type: "CALL_PENDING",
            });
            socket.emit(CALL_EVENT.CALL, {
              roomId: roomId,
              sourceMember: member,
              targetMemberId:
                chatRoom.buyerDTO.id === member.id
                  ? chatRoom.productDTO.sellerDTO.id
                  : chatRoom.buyerDTO.id,
            });
            navigator("/chat/call/pending", {
              state: {
                roomId: roomId,
                isOwner: true,
                next: window.location.pathname,
                targetMember:
                  chatRoom.buyerDTO.id === member.id
                    ? chatRoom.productDTO.sellerDTO
                    : chatRoom.buyerDTO,
              },
            });
          }}
        />
      </div>
      <TopBar>
        {chatRoom.buyerDTO.id === member.id
          ? chatRoom.productDTO.sellerDTO.nickname
          : chatRoom.buyerDTO.nickname}
        &nbsp;
        <Chip
          // color="primary"
          sx={{
            width: "3.5rem",
            height: "1.0rem",
            fontSize: "0.6rem",
            backgroundColor:
              (chatRoom.buyerDTO.id === member.id
                ? chatRoom.productDTO.sellerDTO.score
                : chatRoom.buyerDTO.score) > "50.0"
                ? "#DB4455"
                : (chatRoom.buyerDTO.id === member.id
                    ? chatRoom.productDTO.sellerDTO.score
                    : chatRoom.buyerDTO.score) > "40.0"
                ? "#FFD400"
                : "#B0E0E6",
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
        roomId={roomId}
      />
      <ChatMessageList
        textEvent={textEvent}
        sendTextMessageHandler={sendTextMessageHandler_temp}
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
};

export default GetChatRoom;
