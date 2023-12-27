import React, { useEffect, useState } from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LikeProduct from "../../component/product/LikeProduct";
import { CardActions, Typography } from "@mui/material";
import { formatMoney } from "../../apis/services/product";
import {
  existChatRoomByProductAPI,
  getChatRoomByProductAndMember,
} from "../../apis/api/chat";
import { getMemberAPI } from "../../apis/api/member";
import BottomButton from "./BottomButton";

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
  const [member, setMember] = useState();
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
            <Typography variant="body1" color="textPrimary">
              <LikeProduct prodId={data.id} />
              <b>{formatMoney(data.price)}원</b>
            </Typography>
          </div>
          <Stack direction={"row"}>
            {isMine ? (
              <BottomButton
                navTarget={() => navigate(`/product/suggest/list/${data.id}`)}
                isBlock={true}
                child={`가격제안 보기 (${data.suggestCount})`}
              />
            ) : (
              <BottomButton
                navTarget={() => navigate(`/product/suggest/${data.id}`)}
                isBlock={
                  data.tradeStatus === "SALED"
                    ? false
                    : true && data.validSuggest === false
                    ? true
                    : false
                }
                child={
                  data.validSuggest === false
                    ? `가격제안 하기`
                    : `가격제안 완료`
                }
              />
            )}
            &nbsp;&nbsp;
            {isMine ? (
              <BottomButton
                navTarget={() => navigate(`/chat/list/${data.id}`)}
                isBlock={true}
                child={`채팅방 보기 (${data.chatroomCount})`}
              />
            ) : (
              <BottomButton
                navTarget={startChatting}
                isBlock={data.tradeStatus === "SALED" ? false : true}
                child={`채팅하기`}
              />
            )}
          </Stack>
        </StyledCardActions>
      </Paper>
    </ThemeProvider>
  );
};

export default GetProductBottomBar;
