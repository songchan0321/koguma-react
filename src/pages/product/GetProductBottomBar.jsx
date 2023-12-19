import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { Badge, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LikeProduct from "../../component/product/LikeProduct";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { formatMoney } from "../../apis/services/product";
import {
  chatRoomListBySellerAPI,
  existChatRoomByProductAPI,
  existChatRoomByProductAndBuyerAPI,
  getChatRoomByProductAndMember,
} from "../../apis/api/chat";
import { getMemberAPI } from "../../apis/api/member";

// 테마 생성
const theme = createTheme({
  palette: {
    primary: {
      main: "#D070FB", // 보라색으로 변경
    },
  },
});

const StyledCardActions = styled(CardActions)({
  display: "flex",
  justifyContent: "space-between",
});

const GetProductBottomBar = ({ data, isMine, productId }) => {
  const navigate = useNavigate();
  const [isExist, setIsExist] = useState();
  const [member, setMember] = useState();

  const existChatRoomByProduct = async () => {
    // 해당 구매자의 채팅기록이 있는지
    const chatIsExist = await existChatRoomByProductAPI(data.id);
    setIsExist(chatIsExist);
  };

  useEffect(() => {
    (async () => {
      await getMemberAPI().then(setMember);
    })();
  }, []);
  const startChatting = async () => {
    const response = await existChatRoomByProductAPI(data.id);
    if (response) {
      await getChatRoomByProductAndMember(data.id, member.id).then((room) =>
        navigate(`/chat/get/${room.id}`)
      ); //있다면 채팅방 번호 가져옴
      // navigate(`/chat/get/${data.id}`); //기존 채팅방의 가격 설정후 채팅으로 이동
    } else {
      //구매자의 채팅기록이 없다면 구매자의 우선 입장
      navigate(`/chat/new`, { state: { productId } });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <StyledCardActions>
          <div>
            <LikeProduct prodId={data.id} />
            <span>{formatMoney(data.price)}원</span>
          </div>
          {isMine ? ( // 판매자일때 가격제안 리스트를 확인 nav
            <Button
              color="secondary"
              variant="contained"
              onClick={() => navigate(`/product/suggest/list/${data.id}`)}
            >
              가격제안 1명
            </Button>
          ) : (
            <Button // 구매자일떄 가격제안 nav && 판매완료면 가격제안 못하기
              color="secondary"
              variant="contained"
              onClick={() => navigate(`/product/suggest/${data.id}`)}
            >
              가격 제안하기
            </Button>
          )}
          {isMine ? (
            <Button // 판매자일때 대화중인 채팅방 리스트를 확인 nav
              color="secondary"
              variant="contained"
              onClick={() => navigate(`/chat/list/${data.id}`)}
            >
              대화중인 채팅방 1
            </Button>
          ) : (
            <Button // 구매자일때 채팅방 개설 && 예약중이면 채팅 못하기
              color="secondary"
              variant="contained"
              onClick={startChatting}
            >
              채팅하기
            </Button>
          )}
        </StyledCardActions>
      </Paper>
    </ThemeProvider>
  );
};

export default GetProductBottomBar;
