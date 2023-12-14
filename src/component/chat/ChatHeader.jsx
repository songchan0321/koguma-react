import { Avatar, Box, Button, Typography } from "@mui/material";
import { formatKoreanNumber } from "../../apis/utils/price";

const ChatHeader = ({ product }) => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "56px",
          // display: "flex",
          // alignItems: "center",
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
            {formatKoreanNumber(product.price)}
          </Typography>
          <Button variant="outlined" size="small">
            {"송금하기"}
          </Button>
        </div>
      </Box>
    </>
  );
};

export default ChatHeader;
