import * as React from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Avatar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import LikeCheckButton from "../../component/common/LikeCheckButton";
import LoadingProgress from "../common/LoadingProgress";
import { formatMoney } from "../../apis/services/product";
import { formatTimeAgo } from "../../apis/utils/timestamp";
import { ChatBubbleOutline, FavoriteBorder } from "@mui/icons-material";
import TradeStateButton from "./TradeStateButton";

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
  // const divRefs = React.useRef([]);
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
                  sx={{ maxWidth: "100%" }}
                  id={prod.productDTO.id}
                  onClick={() => getProduct(prod.productDTO.id)}
                  // key={prod.id}
                  // ref={(el) => (divRefs.current[idx] = el)}
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
                        <Typography variant="body1" color="textPrimary">
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
                            <Typography variant="body1" color="textPrimary">
                              {prod.productDTO.tradeStatus === "BUY" ? (
                                <TradeStateButton
                                  type={{ tradeStatus: "BUY" }}
                                />
                              ) : (
                                <TradeStateButton
                                  type={{
                                    tradeStatus: prod.productDTO.tradeStatus,
                                  }}
                                />
                              )}
                              {formatMoney(prod.productDTO.price)}원
                            </Typography>
                          </div>
                          <div id="icongroup" sx={{ marginTop: 100 }}>
                            {prod.productDTO.chatroomCount > 0 && (
                              <>
                                <span style={{ marginRight: "5px" }}>
                                  <ChatBubbleOutline sx={{ fontSize: 16 }} />
                                  &nbsp;
                                  {prod.productDTO.chatroomCount}
                                </span>
                              </>
                            )}
                            {prod.productDTO.likeCount > 0 && (
                              <>
                                {/* <span style={{ marginRight: "5px" }}>
                                  <FavoriteBorder sx={{ fontSize: 16 }} />
                                  &nbsp;
                                  {prod.productDTO.likeCount}
                                </span> */}
                              </>
                            )}
                          </div>
                        </Box>
                      </>
                    }
                    action={
                      type === "report" ? (
                        <></>
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
                  sx={{ maxWidth: "100%" }}
                  id={prod.id}
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
                        sx={{ width: 100, height: 100, mr: 1 }}
                      />
                    }
                    title={
                      <Box>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          sx={{ mb: 1 }}
                        >
                          {prod.title}
                        </Typography>
                      </Box>
                    }
                    subheader={
                      <>
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          sx={{ mb: 1 }}
                        >
                          {prod.dong} {formatTimeAgo(prod.regDate)}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <div>
                            <Typography variant="body1" color="textPrimary">
                              {prod.selectedMenuType === "BUY" ? (
                                <TradeStateButton
                                  type={{ tradeStatus: "BUY" }}
                                />
                              ) : (
                                <TradeStateButton
                                  type={{ tradeStatus: prod.tradeStatus }}
                                />
                              )}
                              {formatMoney(prod.price)}원
                            </Typography>
                          </div>
                          <div id="icongroup" sx={{ marginTop: 100 }}>
                            {prod.chatroomCount > 0 && (
                              <>
                                <span style={{ marginRight: "5px" }}>
                                  <ChatBubbleOutline sx={{ fontSize: 16 }} />
                                  &nbsp;
                                  {prod.chatroomCount}
                                </span>
                              </>
                            )}
                            {prod.likeCount > 0 && (
                              <>
                                <span style={{ marginRight: "5px" }}>
                                  <FavoriteBorder sx={{ fontSize: 16 }} />
                                  &nbsp;
                                  {prod.likeCount}
                                </span>
                              </>
                            )}
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
