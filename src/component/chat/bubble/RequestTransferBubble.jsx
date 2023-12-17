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

const RequestTransferBubble = ({ msg, isOwnMessage, nickname, roomId }) => {
  const navigator = useNavigate();
  const [price, status] = msg.content.split(", ");
  return (
    <Card sx={{ maxWidth: "12.5rem", ml: isOwnMessage ? "0" : "0.5rem" }}>
      <CardMedia
        sx={{ height: "10rem", width: "12.5rem" }}
        image={`/chat/request.png`}
        title="green iguana"
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {`${formatCommaNumber(price)}원을 송금 요청했어요!`}
        </Typography>
      </CardContent>
      <CardActions>
        {!isOwnMessage && status === "0" && (
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#D070FB" }}
            onClick={() => {
              navigator("/payment/transfer", {
                state: {
                  roomId: roomId,
                  requestPoint: price,
                  messageId: msg.messageId,
                },
              });
            }}
          >
            송금 하기
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default RequestTransferBubble;
