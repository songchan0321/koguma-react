import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Typography,
} from "@mui/material";
import { formatMoney } from "../../apis/services/product";
import { useState } from "react";
import {
  existChatRoomByProductAndBuyerAPI,
  getChatRoomByProductAndMember,
  updateChatRoomBySuggestAPI,
} from "../../apis/api/chat";
import { Navigate, useNavigate } from "react-router-dom";

const SuggestPriceComponent = ({ suggestData }) => {
  const [isExist, setIsExist] = useState();
  const navigate = useNavigate();

  const existChatRoomByProductAndBuyer = async () => {
    // 해당 구매자의 채팅기록이 있는지
    const chatIsExist = await existChatRoomByProductAndBuyerAPI(
      suggestData.productDTO.id,
      suggestData.memberDTO.id
    );
    setIsExist(chatIsExist);
  };

  const startChatting = async () => {
    await existChatRoomByProductAndBuyer(); //구매자의 채팅기록이 있는지 확인
    if (isExist) {
      const { data } = await getChatRoomByProductAndMember(); //있다면 채팅방 번호 가져옴
      await updateChatRoomBySuggestAPI(data.id, suggestData.price); // 해당 채팅방의 가격을 설정

      navigate(`/chat/get/${data.id}`); //기존 채팅방의 가격 설정후 채팅으로 이동
    } else {
      //구매자의 채팅기록이 없다면

      navigate(`/chat/new/suggest`, {
        //새로운 채팅방 개설

        state: {
          productId: suggestData.productDTO.id,
          memberId: suggestData.memberDTO.id,
        },
      });
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
              {suggestData.memberDTO.nickname}
            </Typography>
            <Typography variant="subtitle3" color="text">
              {suggestData.memberDTO.score}°C
            </Typography>
          </Box>
        }
        subheader={
          <>
            <Typography variant="subtitle2" color="textSecondary">
              {suggestData.regDate}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography variant="h6" color="textSecondary">
                  {formatMoney(suggestData.price)}원
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
