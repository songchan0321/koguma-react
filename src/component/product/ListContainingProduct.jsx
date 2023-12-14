import * as React from "react";
import { styled } from "@mui/material/styles";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";

import FeedbackIcon from "@mui/icons-material/Feedback";
import FavoriteIcon from "@mui/icons-material/Favorite"; //채워진 하트
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // 안채워진 하트
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LikeCheckButton from "../../component/common/LikeCheckButton";
import LoadingProgress from "../common/LoadingProgress";
import { formatMoney } from "../../apis/services/product";

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

const ListContainingProduct = ({ data, index, type }) => {
  const navigate = useNavigate();

  const getProduct = (productId) => {
    navigate(`/product/get/${productId}`);
  };

  return (
    <>
      {data ? (
        <>
          {data.map((prod, idx) => (
            <Card
              id={prod.id}
              sx={{ maxWidth: "100%" }}
              onClick={() => getProduct(prod.id)}
            >
              <CardHeader
                avatar={
                  <CardMedia
                    component="img"
                    height="120"
                    image={
                      prod.imageDTO && prod.imageDTO.length > 0
                        ? prod.imageDTO[0].url
                        : "/photo.png"
                    }
                    alt="/photo.png"
                  />
                }
                action={
                  type === "report" ? (
                    <IconButton
                      aria-label="settings"
                      onClick={() => console.log("이 상품 신고하기")}
                    >
                      <FeedbackIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="settings"
                      onClick={() => console.log("좋아요 추가 취소")}
                    >
                      <LikeCheckButton />
                    </IconButton>
                  )
                }
                title={
                  <Box>
                    <Typography variant="h6" color="textSecondary">
                      {prod.title}
                    </Typography>
                  </Box>
                }
                subheader={
                  <>
                    <Typography variant="subtitle2" color="textSecondary">
                      {prod.dong}, 끌어올린 시간
                    </Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <div>
                        <Typography variant="h6" color="textSecondary">
                          {formatMoney(prod.price)}원
                        </Typography>
                      </div>
                      <div id="icongroup" sx={{ marginTop: 100 }}>
                        <IconButton aria-label="add to favorites">
                          <FavoriteBorderIcon />
                        </IconButton>
                        1
                        <IconButton aria-label="add to favorites">
                          <ChatBubbleOutlineIcon />
                        </IconButton>
                        5
                      </div>
                    </Box>
                  </>
                }
              />
            </Card>
          ))}
        </>
      ) : (
        <LoadingProgress />
      )}
    </>
  );
};
export default ListContainingProduct;
