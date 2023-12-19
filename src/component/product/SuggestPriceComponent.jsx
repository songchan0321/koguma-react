import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Typography,
} from "@mui/material";
import { formatMoney } from "../../apis/services/product";
import { useContext, useState } from "react";
import {
  addChatRoomBySuggest,
  enterChatRoomAPI,
  existChatRoomByProductAndBuyerAPI,
  getChatRoomByProductAndMember,
  updateChatRoomBySuggestAPI,
} from "../../apis/api/chat";
import { Navigate, useNavigate } from "react-router-dom";
import { CHAT_EVENT, SocketContext } from "../../context/socket";

const SuggestPriceComponent = (suggestData) => {
  const socket = useContext(SocketContext);
  const [isExist, setIsExist] = useState();
  const navigate = useNavigate();
  console.log(suggestData);
  // const existChatRoomByProductAndBuyer = async () => {
  //   // 해당 구매자의 채팅기록이 있는지
  //   const chatIsExist = await existChatRoomByProductAndBuyerAPI(
  //     suggestData.data.productDTO.id,
  //     suggestData.data.memberDTO.id
  //   );
  //   setIsExist(chatIsExist);
  // };

  const startChatting = async () => {
    // await existChatRoomByProductAndBuyer(); //구매자의 채팅기록이 있는지 확인
    const data = await existChatRoomByProductAndBuyerAPI(
      suggestData.data.productDTO.id,
      suggestData.data.memberDTO.id
    );
    if (data.result) {
      await getChatRoomByProductAndMember(
        suggestData.data.productDTO.id,
        suggestData.data.memberDTO.id
      )
        .then((room) => {
          updateChatRoomBySuggestAPI(room.id, suggestData.data.price);
          return room;
        })
        .then((room) => enterChatRoomAPI(room.id))
        .then((room) => {
          socket.emit(CHAT_EVENT.SEND_MESSAGE, {
            roomId: room.id,
            toId: room.buyerDTO.id,
            type: "ALERT",
            message: "가격 제안이 적용되었어요!",
            enter_date:
              room.buyerEnterDate > room.sellerEnterDate
                ? room.buyerEnterDate
                : room.sellerEnterDate,
            token: `${localStorage.getItem("token")}`,
          });
          return room;
        })
        .then((room) => navigate(`/chat/get/${room.id}`))
        .catch((err) => alert(err.content));
      //있다면 채팅방 번호 가져옴
      //update
      // await updateChatRoomBySuggestAPI(data.id, suggestData.data.price); // 해당 채팅방의 가격을 설정

      // navigate(`/chat/get/${data.id}`); //기존 채팅방의 가격 설정후 채팅으로 이동
    } else {
      // 구매자의 채팅기록이 없다면
      await addChatRoomBySuggest(
        suggestData.data.productDTO.id,
        suggestData.data.memberDTO.id,
        suggestData.data.price
      )
        .then((room) => {
          socket.emit(CHAT_EVENT.SEND_MESSAGE, {
            roomId: room.id,
            toId: room.buyerDTO.id,
            type: "ALERT",
            message: "가격 제안이 적용되었어요!",
            enter_date: room.buyerEnterDate,
            token: `${localStorage.getItem("token")}`,
          });
          return room;
        })
        .then((room) => {
          navigate(`/chat/get/${room.id}`);
        });
      //알림 보내기
    }
  };

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        // onClick={() => getMember(data.sellerDTO.id)}

        title={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" color="textSecondary">
              {suggestData.data.memberDTO.nickname}
            </Typography>
            <Typography variant="subtitle3" color="text">
              {suggestData.data.memberDTO.score}°C
            </Typography>
          </Box>
        }
        subheader={
          <>
            <Typography variant="subtitle2" color="textSecondary">
              {suggestData.data.regDate}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography variant="h6" color="textSecondary">
                  {formatMoney(suggestData.data.price)}원
                </Typography>
              </div>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => startChatting()}
              >
                채팅 하기
              </Button>
            </Box>
          </>
        }
      />
    </Card>
  );
};

export default SuggestPriceComponent;
