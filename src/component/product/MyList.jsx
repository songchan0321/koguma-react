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
import { listProductBySaleAPI } from "../../apis/api/Product";
import { formatMoney } from "../../apis/services/product";
import {
  absoulte_timestamp_new_date,
  formatTimeAgo,
} from "../../apis/utils/timestamp";
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
  const fetchData = async () => {
    try {
      const { data } = await listProductBySaleAPI(selectedMenuType);
      setProduct(data);
      console.log(data);
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
                  <CardMedia
                    component="img"
                    height="120"
                    width="120"
                    image={
                      prod.imageDTO && prod.imageDTO.length > 0
                        ? prod.imageDTO[0].url
                        : "/photo.png"
                    }
                    alt="/photo.png"
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
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <div>
                        <Typography variant="h6" color="textSecondary">
                          <TradeStateButton
                            type={{ tradeStatus: prod.tradeStatus }}
                          />
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
                onClick={() => onClickGetProduct(prod.id)}
              />
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ flex: 6, marginLeft: "10px" }}
                  onClick={() => {
                    onClick(prod.id);
                    setChange(change + 1);
                  }}
                >
                  {buttonNM}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleModalOpen(prod.id)}
                  style={{ flex: 1, marginLeft: "10px", marginRight: "10px" }}
                >
                  <MoreHorizIcon />
                </Button>
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
