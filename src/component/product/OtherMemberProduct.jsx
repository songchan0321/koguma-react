import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  Avatar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotData from "./NotData";
import { listProductBySaleOtherMemberAPI } from "../../apis/api/Product";
import { formatMoney } from "../../apis/services/product";
import { formatTimeAgo } from "../../apis/utils/timestamp";
import TradeStateButton from "./TradeStateButton";
import { ChatBubbleOutline, FavoriteBorder } from "@mui/icons-material";
import LoadingProgress from "../common/LoadingProgress";
import MarginEmpty from "../payment/MarginEmpty";

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

const OtherMemberProduct = ({
  selectedMenuType,
  onClickGetProduct,
  memberId,
}) => {
  const [prodNo, setProdNo] = React.useState(null);
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      console.log(memberId);
      const { data } = await listProductBySaleOtherMemberAPI(
        selectedMenuType,
        memberId
      );
      setProduct(data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [selectedMenuType]); // selectedMenuType가 변경될 때마다 fetchData 실행

  return (
    <>
      {loading ? (
        <LoadingProgress />
      ) : (
        <>
          {Array.isArray(product) && product.length > 0 ? (
            <>
              <MarginEmpty value={"250px"} />
              {product.map((prod, idx) => (
                <React.Fragment key={idx}>
                  <Card sx={{ maxWidth: "100%" }} id={prod.id}>
                    <CardHeader
                      avatar={
                        <Avatar
                          alt=""
                          src={
                            prod.imageDTO && prod.imageDTO.length > 0
                              ? prod.imageDTO[0].url
                              : undefined
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
                                {selectedMenuType === "SALED" && (
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
                      onClick={() => onClickGetProduct(prod.id)}
                    />
                  </Card>
                </React.Fragment>
              ))}
            </>
          ) : (
            <NotData>
              <div>상품이 존재하지 않아요.</div>
            </NotData>
          )}
        </>
      )}
    </>
  );
};
export default OtherMemberProduct;
