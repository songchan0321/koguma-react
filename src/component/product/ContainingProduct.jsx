import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // 안채워진 하트
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { formatMoney } from "../../apis/services/product";
import TradeStateButton from "./TradeStateButton";
import { formatTimeAgo } from "../../apis/utils/timestamp";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ContainingProduct = ({ data }) => {
  console.log(data);
  return (
    <>
      <Card id={data.id} sx={{ maxWidth: "100%" }}>
        <CardHeader
          avatar={
            <CardMedia
              component="img"
              height="120"
              image={
                data.imageDTO && data.imageDTO.length > 0
                  ? data.imageDTO[0].url
                  : "/photo.png"
              }
              alt="/photo.png"
            />
          }
          title={
            <Box>
              <Typography variant="body1" color="textPrimary">
                {data.title}
              </Typography>
            </Box>
          }
          subheader={
            <>
              <Typography variant="subtitle2" color="textSecondary">
                {data.dong}
                {formatTimeAgo(data.regDate)}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography variant="body1" color="textPrimary">
                    {data.tradeStatus === "BUY" ? (
                      <TradeStateButton type={{ tradeStatus: "BUY" }} />
                    ) : (
                      <TradeStateButton
                        type={{ tradeStatus: data.tradeStatus }}
                      />
                    )}
                    &nbsp;
                    {formatMoney(data.price)}원
                  </Typography>
                </div>
              </Box>
            </>
          }
        />
      </Card>
    </>
  );
};
export default ContainingProduct;
