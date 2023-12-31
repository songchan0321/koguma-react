import { Avatar, Box, Button, Typography } from "@mui/material";
import { formatKoreanNumber } from "../../apis/utils/price";
import { useNavigate } from "react-router-dom";
import { getMyReviewIdByProductIdAPI } from "../../apis/api/Product";
import { useEffect, useState } from "react";
const NavButton = ({ product, member, roomId, reviewId }) => {
  const navigator = useNavigate();
  let text;
  let clickHandler;
  if (product.tradeStatus === "SALED") {
    if (
      product.sellerDTO.id === member.id ||
      (product.buyerDTO !== null && product.buyerDTO.id === member.id)
    ) {
      if (reviewId) {
        text = "작성한 리뷰 보기";
        clickHandler = () => {
          navigator(`/product/get/review/${reviewId}`, {
            state: { roomId: roomId },
          });
        };
      } else {
        text = "리뷰 작성하기";
        clickHandler = () => {
          navigator(`/product/review/add`, {
            state: { roomId: roomId, productId: product.id },
          });
        };
      }
    } else {
      text = "상품 정보";
      clickHandler = () => {
        navigator(`/product/get/${product.id}`, { state: { roomId: roomId } });
      };
    }
  } else {
    text = "상품 정보";
    clickHandler = () => {
      navigator(`/product/get/${product.id}`, { state: { roomId: roomId } });
    };
  }
  return (
    <Button variant="outlined" size="small" onClick={clickHandler}>
      {text}
    </Button>
  );
};
const ChatHeader = ({ product, member, price, roomId }) => {
  const [reviewId, setReviewId] = useState();
  useEffect(() => {
    (async () => {
      await getMyReviewIdByProductIdAPI(product.id)
        .then((data) => setReviewId(data))
        .catch((err) => alert(err));
    })();
  }, []);
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
        <Avatar
          variant="rounded"
          sx={{ mr: 1 }}
          src={product.imageDTO[0].url}
        ></Avatar>
        <div>
          <Typography variant="subtitle1">
            {product.tradeStatus === "SALE"
              ? "판매중"
              : product.tradeStatus === "SALED"
              ? "거래완료"
              : product.tradeStatus === "RESERVATION"
              ? "예약중"
              : product.tradeStatus === "HIDE"
              ? "숨김"
              : "?"}
            &nbsp;&nbsp;&nbsp;
            <span style={{ fontSize: "0.9rem" }}>{product.title}</span>
          </Typography>
          <Typography variant="subtitle1">
            {formatKoreanNumber(price)}
          </Typography>
          <NavButton
            product={product}
            member={member}
            roomId={roomId}
            reviewId={reviewId}
          />
        </div>
      </Box>
    </>
  );
};

export default ChatHeader;
