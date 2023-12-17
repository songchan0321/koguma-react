import { Avatar, Box, Button, Typography } from "@mui/material";
import { formatKoreanNumber } from "../../apis/utils/price";
import { useNavigate } from "react-router-dom";
const NavButton = ({ room, member }) => {
  const navigator = useNavigate();
  let text;
  let clickHandler;
  if (room.productDTO.tradeStatus === "SALED") {
    if (
      room.productDTO.sellerDTO.id === member.id ||
      (room.productDTO.buyerDTO !== null &&
        room.productDTO.buyerDTO.id === member.id)
    )
      text = "리뷰 있으면 리뷰 보기, 없으면 리뷰 작성 Navi";
    clickHandler = () => {
      alert("navi");
    };
  } else {
    text = "상품 정보";
    clickHandler = () => {
      navigator(`/product/get/${room.productDTO.id}`);
    };
  }
  return (
    <Button variant="outlined" size="small" onClick={clickHandler}>
      {text}
    </Button>
  );
};
const ChatHeader = ({ room, member }) => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "56px",
          backgroundColor: "#F5F5DC",
          height: "115px",
          width: "100%",
          zIndex: "500",
        }}
      ></div>
      <Box
        position="fixed"
        left="20px"
        top="70px"
        display="flex"
        alignItems="center"
        gap={1}
        sx={{ zIndex: "1001" }}
      >
        <Avatar variant="rounded" sx={{ mr: 1 }}>
          P
        </Avatar>
        <div>
          <Typography variant="subtitle1">
            {room.productDTO.tradeStatus === "SALE"
              ? "판매중"
              : room.productDTO.tradeStatus === "SALED"
              ? "거래완료"
              : room.productDTO.tradeStatus === "RESERVATION"
              ? "예약중"
              : room.productDTO.tradeStatus === "HIDE"
              ? "숨김"
              : "?"}
            &nbsp;&nbsp;&nbsp;
            <span style={{ fontSize: "0.9rem" }}>{room.productDTO.title}</span>
          </Typography>
          <Typography variant="subtitle1">
            {formatKoreanNumber(room.price)}
          </Typography>
          <NavButton room={room} member={member} />
        </div>
      </Box>
    </>
  );
};

export default ChatHeader;
