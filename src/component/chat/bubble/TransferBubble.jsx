import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { formatCommaNumber } from "../../../apis/utils/price";
import { useNavigate } from "react-router-dom";

const TransferBubble = ({ msg, isOwnMessage, nickname }) => {
  const navigator = useNavigate();
  return (
    <Card sx={{ maxWidth: "12.5rem", ml: isOwnMessage ? "0" : "0.5rem" }}>
      <CardMedia
        sx={{ height: "10rem", width: "12.5rem" }}
        image={`/chat/transfer.png`}
        title="green iguana"
      />
      <CardContent>
        {/* <Typography gutterBottom variant="h5" component="div">
          {`${nickname}님이 포인트를 송금했어요!`}
        </Typography> */}
        <Typography variant="body1" color="text.secondary">
          {`${formatCommaNumber(msg.content)}원을 송금했어요!`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          //   color="secondary"
          sx={{ backgroundColor: "#D070FB" }}
          onClick={() => navigator("/payment/get")}
        >
          내역 확인
        </Button>
      </CardActions>
    </Card>
    // <Avatar
    //   alt=""
    //   variant="rounded"
    //   src={`/chat/transfer.png`}
    //   sx={{
    //     ml: isOwnMessage ? "0" : "0.5rem",
    //     width: "14rem",
    //     height: "10rem",
    //     border: "1px solid rgba(0, 0, 0, 0.1)", // 테두리 스타일 및 색상 지정
    //   }}
    // />
  );
};

export default TransferBubble;
