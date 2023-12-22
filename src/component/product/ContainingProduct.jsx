import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  Box,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";

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
            <Avatar
              alt="/photo.png"
              src={
                data.imageDTO && data.imageDTO.length > 0
                  ? data.imageDTO[0].url
                  : "/photo.png"
              }
              variant="square"
              sx={{ width: 100, height: 100, mr: 1 }}
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
