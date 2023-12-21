import * as React from "react";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite"; //채워진 하트
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // 안채워진 하트
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import NotData from "./NotData";
import {
  listProductByBuyAPI,
  listProductBySaleAPI,
  listProductBySaledAPI,
} from "../../apis/api/Product";
import { formatMoney } from "../../apis/services/product";
import {
  absoulte_timestamp_new_date,
  formatTimeAgo,
} from "../../apis/utils/timestamp";
import TradeStateButton from "./TradeStateButton";
import { ChatBubbleOutline, FavoriteBorder } from "@mui/icons-material";

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

const MyList = ({
  selectedMenuType,
  buttonNM,
  selectedActions,
  onClick,
  onClickGetProduct,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [prodNo, setProdNo] = React.useState(null);
  const [change, setChange] = React.useState(0);
  const [product, setProduct] = React.useState([]);
  const navigate = useNavigate();
  const handleModalOpen = (prodNo) => {
    setProdNo(prodNo);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const getReviewNavigate = (isSeller, productId) => {
    navigate(`/product/get/review`, {
      state: {
        isSeller: isSeller,
        productId: productId,
      },
    });
  };
  //   const addReviewNavigate = (isSeller) => {
  //     navigate(`/product/get/review/${data.id}`, {
  //       state: {
  //         isSeller: location.state.seller,
  //         productId: data.productDTO.id,
  //       },
  //     });
  //   };

  // const fetchData = async () => {
  //   try {
  //     if (selectedMenuType === "BUY") {
  //       await listProductByBuyAPI().then(({ data }) => setProduct(data));
  //     } else {
  //       await listProductBySaleAPI(selectedMenuType).then(({ data }) =>
  //         setProduct(data)
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const fetchData = async () => {
    try {
      if (selectedMenuType === "BUY") {
        await listProductByBuyAPI()
          .then((data) => setProduct(data))
          .then(() => console.log(product));
      } else {
        await listProductBySaledAPI()
          .then((data) => setProduct(data))
          .then(() => console.log(product));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [selectedMenuType, isModalOpen, change]); // selectedMenuType가 변경될 때마다 fetchData 실행

  return (
    <>
      {Array.isArray(product) && product.length > 0 ? (
        product.map((prod, idx) => (
          <React.Fragment key={idx}>
            <Card sx={{ maxWidth: "100%" }} id={prod.id}>
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
                    <Typography variant="body1" color="textPrimary">
                      {prod.title}
                    </Typography>
                  </Box>
                }
                subheader={
                  <>
                    <Typography variant="subtitle2" color="textSecondary">
                      {prod.dong} {formatTimeAgo(prod.regDate)}
                    </Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <div>
                        <Typography variant="body1" color="textPrimary">
                          {selectedMenuType === "BUY" ? (
                            <TradeStateButton type={{ tradeStatus: "BUY" }} />
                          ) : (
                            <TradeStateButton
                              type={{ tradeStatus: prod.tradeStatus }}
                            />
                          )}
                          &nbsp;
                          {formatMoney(prod.price)}원
                        </Typography>
                      </div>
                      <div id="icongroup" sx={{ marginTop: 100 }}>
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
                    </Box>
                  </>
                }
                onClick={() => onClickGetProduct(prod.id)}
              />
              <div style={{ display: "flex", marginBottom: "10px" }}>
                {prod.reviewId > 0 ? (
                  <>
                    <Button
                      variant="outlined"
                      color="secondary"
                      style={{ flex: 6, marginLeft: "10px" }}
                      onClick={() =>
                        navigate(`/product/get/review/${prod.reviewId}`)
                      }
                    >
                      후기 확인하기
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleModalOpen(prod.id)}
                      style={{
                        flex: 1,
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    >
                      <MoreHorizIcon />
                    </Button>
                  </>
                ) : (
                  <>
                    {prod.myReviewId ? (
                      <>
                        <>
                          <Button
                            variant="outlined"
                            color="secondary"
                            style={{ flex: 6, marginLeft: "10px" }}
                            disabled="true"
                            onClick={() => {
                              navigate(`/product/review/add`, {
                                state: { productId: prod.id },
                              });
                            }}
                          >
                            후기 작성완료
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleModalOpen(prod.id)}
                            style={{
                              flex: 1,
                              marginLeft: "10px",
                              marginRight: "10px",
                            }}
                          >
                            <MoreHorizIcon />
                          </Button>
                        </>
                      </>
                    ) : (
                      <>
                        <>
                          <Button
                            variant="outlined"
                            color="secondary"
                            style={{ flex: 6, marginLeft: "10px" }}
                            onClick={() => {
                              navigate(`/product/review/add`, {
                                state: { productId: prod.id },
                              });
                            }}
                          >
                            후기 작성하기
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleModalOpen(prod.id)}
                            style={{
                              flex: 1,
                              marginLeft: "10px",
                              marginRight: "10px",
                            }}
                          >
                            <MoreHorizIcon />
                          </Button>
                        </>
                      </>
                    )}
                  </>
                )}
              </div>
            </Card>
            <Dialog open={isModalOpen} onClose={handleModalClose}>
              <DialogTitle>상품 설정</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {selectedActions.map((selectedAction, idx) => (
                    <MenuItem
                      key={idx}
                      // onClick={() => navigate("/product/review/add")}
                      onClick={() => selectedAction.action(prodNo)}
                    >
                      {selectedAction.name}
                    </MenuItem>
                  ))}
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </React.Fragment>
        ))
      ) : (
        <NotData>상품</NotData>
      )}
    </>
  );
};
export default MyList;
