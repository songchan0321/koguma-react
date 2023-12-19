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
  Checkbox,
} from "@mui/material";
import { red } from "@mui/material/colors";

import FeedbackIcon from "@mui/icons-material/Feedback";
import FavoriteIcon from "@mui/icons-material/Favorite"; //채워진 하트
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // 안채워진 하트
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LikeCheckButton from "../../component/common/LikeCheckButton";
import LoadingProgress from "../common/LoadingProgress";
import { formatMoney } from "../../apis/services/product";
import { formatTimeAgo } from "../../apis/utils/timestamp";
import {
  ChatBubble,
  ChatBubbleOutline,
  FavoriteBorder,
} from "@mui/icons-material";

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
  console.log(data);
  console.log(type);
  const getProduct = (productId) => {
    navigate(`/product/get/${productId}`);
  };

  return (
    <>
      {data && data.length > 0 ? (
        <>
          {type === "like"
            ? data.map((prod, idx) => (
                <Card
                  id={prod.productDTO.id}
                  sx={{ maxWidth: "100%" }}
                  onClick={() => getProduct(prod.productDTO.id)}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="/photo.png"
                        src={
                          prod.productDTO.imageDTO &&
                          prod.productDTO.imageDTO.length > 0
                            ? prod.productDTO.imageDTO[0].url
                            : "/photo.png"
                        }
                        variant="square"
                        sx={{ width: 100, height: 100, mr: 1 }}
                      />
                    }
                    title={
                      <Box>
                        <Typography variant="h6" color="textSecondary">
                          {prod.productDTO.title}
                        </Typography>
                      </Box>
                    }
                    subheader={
                      <>
                        <Typography variant="subtitle2" color="textSecondary">
                          {prod.productDTO.dong}{" "}
                          {formatTimeAgo(prod.productDTO.regDate)}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <Typography variant="h6" color="textSecondary">
                              {formatMoney(prod.productDTO.price)}원
                            </Typography>
                          </div>
                        </Box>
                      </>
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
                        <IconButton>
                          <LikeCheckButton />
                        </IconButton>
                      )
                    }
                  />
                </Card>
              ))
            : data.map((prod, idx) => (
                <Card
                  id={prod.id}
                  sx={{
                    maxWidth: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  onClick={() => getProduct(prod.id)}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="/photo.png"
                        src={
                          prod.imageDTO && prod.imageDTO.length > 0
                            ? prod.imageDTO[0].url
                            : "/photo.png"
                        }
                        variant="square"
                        sx={{
                          width: 100,
                          height: 100,
                          mr: 1,
                          border: "1px solid #ccc",
                        }}
                      />
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
                          {prod.dong} {formatTimeAgo(prod.regDate)}
                        </Typography>
                        <Box>
                          <div>
                            <Typography variant="h6" color="textSecondary">
                              {formatMoney(prod.price)}원
                            </Typography>
                          </div>
                        </Box>
                      </>
                    }
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    {type === "report" && (
                      <IconButton
                        aria-label="settings"
                        onClick={() => console.log("이 상품 신고하기")}
                        style={{ marginRight: "5px" }}
                      >
                        <FeedbackIcon />
                      </IconButton>
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "60px",
                      }}
                    >
                      {prod.chatroomCount > 0 && (
                        <>
                          <span style={{ marginRight: "5px" }}>
                            <ChatBubbleOutline />
                            &nbsp;
                            {prod.chatroomCount}
                          </span>
                        </>
                      )}
                      {prod.likeCount > 0 && (
                        <>
                          <span style={{ marginRight: "5px" }}>
                            <FavoriteBorder />
                            &nbsp;
                            {prod.likeCount}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
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
