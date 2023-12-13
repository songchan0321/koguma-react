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

const ReviewProductBar = (data) => {
  return (
    <>
      <Card id={data} sx={{ maxWidth: "100%" }}>
        <CardHeader
          avatar={
            <CardMedia
              component="img"
              height="120"
              image="/photo.png"
              alt="Paella dish"
            />
          }
          title={
            <Box>
              <Typography variant="h6" color="textSecondary">
                상품 이름
              </Typography>
            </Box>
          }
          subheader={
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography variant="subtitle1" color="textSecondary">
                    <span>
                      <span>거래한 회원 </span>
                      <b>멀렁카우</b>
                    </span>
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
export default ReviewProductBar;
