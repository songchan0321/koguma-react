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
import { formatTimeAgo } from "../../apis/utils/timestamp";
import ScoreColor from "../common/ScoreColor";

const SuggestPriceComponent = (suggestData) => {
  const socket = useContext(SocketContext);
  const [isExist, setIsExist] = useState();
  const navigate = useNavigate();

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
          return updateChatRoomBySuggestAPI(room.id, suggestData.data.price);
          // return room;
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
        .catch((err) => {
          alert("이미 제안된 ");
        });
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
        avatar={
          // <Avatar
          //   aria-label="recipe"
          //   style={{ width: "48px", height: "48px" }} // Avatar 크기 조정
          // >
          //   <img
          //     src={suggestData.data.memberDTO.profileURL}
          //     alt="profile"
          //     style={{
          //       width: "100%",
          //       height: "100%",
          //       borderRadius: "50%",
          //     }} // 이미지 크기 및 모양 조정
          //   />
          // </Avatar>
          <Avatar
            aria-label="recipe"
            style={{ width: "48px", height: "48px" }} // Avatar 크기 조정
            src={suggestData.data.memberDTO?.profileURL}
            alt=""
          ></Avatar>
        }
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" color="textPrimary" sx={{ mt: 2 }}>
              {suggestData.data.memberDTO.nickname}
            </Typography>
            <Typography variant="subtitle3" color="text">
              <ScoreColor score={suggestData.data.memberDTO.score} />
            </Typography>
          </Box>
        }
        subheader={
          <>
            <Typography variant="subtitle2" color="textSecondary">
              {suggestData.data.locationDTO.dong} ·{" "}
              {formatTimeAgo(suggestData.data.regDate)}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography variant="body1" color="textPrimary">
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
