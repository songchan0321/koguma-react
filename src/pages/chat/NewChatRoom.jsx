import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductAPI } from "../../apis/api/Product";
import ChatForm from "../../component/chat/ChatForm";
import { Chip, List } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import HorizontalScrollChips from "../../component/chat/HorizontalScrollChips";
import {
  addChatRoom,
  addSoloChatRoom,
  enterChatRoomAPI,
  existAbsoluteChatRoomByProductAPI,
  getChatRoomByProductAndMember,
} from "../../apis/api/chat";
import { CHAT_EVENT, SocketContext } from "../../context/socket";
import LoadingProgress from "../../component/common/LoadingProgress";
import { getMemberAPI, getReverseBlockAPI } from "../../apis/api/member";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import ChatHeader from "../../component/chat/ChatHeader";
import WarningBubble from "../../component/chat/bubble/WarningBubble";

const NewChatRoom = () => {
  const socket = useContext(SocketContext);
  const navigator = useNavigate();
  const {
    state: { productId },
  } = useLocation();
  const [product, setProduct] = useState();
  const [member, setMember] = useState();

  const sendTextMessageHandler_temp = async ({ text, type, toId }) => {
    console.log("sendTextMessageHandler_temp()");
    // 판매자가 나를 차단하냐?
    const block_flag = await getReverseBlockAPI(product.sellerDTO.id);
    // 로그인한 회원(구매 예정자)이 채팅방이 리얼 처음인가
    console.log(block_flag);
    const room_exist_flag = await existAbsoluteChatRoomByProductAPI(
      productId
    ).catch((err) => alert(err));
    console.log(room_exist_flag);
    if (block_flag) {
      // 상대방은 무조건 채팅방이 없으니(채팅방에 나가지기에), enter X
      // 상대방도 없고 나도 없네? 상대방 exist 체크도 필요없음 무조건 추가해야함
      await addSoloChatRoom(productId).then((room) => {
        socket.emit(CHAT_EVENT.SEND_MESSAGE, {
          roomId: room.id,
          toId: room.productDTO.sellerDTO.id,
          type: type,
          token: `${localStorage.getItem("token")}`,
          enter_date: room.buyerEnterDate,
          message: text,
          flag: true, // 알림 발송 여부
        });
        navigator(`/chat/get/${room.id}`);
      });
    } else {
      if (room_exist_flag) {
        await getChatRoomByProductAndMember(product.id, member.id)
          .then((room) => enterChatRoomAPI(room.id))
          .then((room) => {
            socket.emit(CHAT_EVENT.SEND_MESSAGE, {
              roomId: room.id,
              toId: room.productDTO.sellerDTO.id,
              type: type,
              token: `${localStorage.getItem("token")}`,
              enter_date: room.buyerEnterDate,
              message: text,
            });
            navigator(`/chat/get/${room.id}`);
          });
      } else {
        await addChatRoom(product.id).then((room) => {
          socket.emit(CHAT_EVENT.SEND_MESSAGE, {
            roomId: room.id,
            toId: room.productDTO.sellerDTO.id,
            type: type,
            token: `${localStorage.getItem("token")}`,
            enter_date: room.buyerEnterDate,
            message: text,
          });
          navigator(`/chat/get/${room.id}`);
        });
      }
    }
  };

  useEffect(() => {
    (async () => {
      await getProductAPI(productId).then((data) => setProduct(data));
      await getMemberAPI().then((data) => setMember(data));
    })();
  }, [productId]);
  return !product || !member ? (
    <LoadingProgress />
  ) : (
    <>
      <Back url={`/chat/list`} />
      <div style={{ position: "fixed", right: 6, top: 12, zIndex: 1005 }}>
        <Chip
          icon={<ThermostatIcon fontSize="small" />}
          color="primary"
          label={product.sellerDTO.score + "°C"}
        />
      </div>
      <TopBar>{product.sellerDTO.nickname}</TopBar>
      <MarginEmpty />
      <ChatHeader product={product} member={member} price={product.price} />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <WarningBubble
          contetnt={
            "고구마 페이가 아닌 타 계좌번호로 송금을 요구하는 경우 사기일 위험이 있으니 주의하세요!"
          }
        />
      </div>
      {/* <AlertBubble contetnt={"123"} /> */}
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <HorizontalScrollChips
          sendTextMessageHandler={sendTextMessageHandler_temp}
          product={product}
        />

        <ChatForm
          sendTextMessageHandler={sendTextMessageHandler_temp}
          product={product}
        />
      </List>
    </>
  );
};

export default NewChatRoom;
