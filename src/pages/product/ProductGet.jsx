import * as React from "react";
import { styled } from "@mui/material/styles";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GetProductBottomBar from "./GetProductBottomBar";
import { getProductAPI, validProductAPI } from "../../apis/api/Product";
import LoadingProgress from "../../component/common/LoadingProgress";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import ImgCarousel from "../../component/product/ImgCarousel";
import ThermostatIcon from "@mui/icons-material/Thermostat";
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

const ProductGet = () => {
  const { productId } = useParams();
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [isMine, setIsMine] = useState();
  const navigate = useNavigate();

  const getMember = (memberId) => {
    navigate(`/member/other/get/${memberId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProductAPI(productId);
        setData(result);
        console.log(result);
        const valid = await validProductAPI(productId);
        setIsMine(valid);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Back
        url={state?.roomId ? `/chat/get/${state.roomId}` : "/product/list"}
      />
      <TopBar>상품 조회</TopBar>
      <MarginEmpty />
      {data ? (
        <>
          <Card sx={{ maxWidth: "100%" }}>
            <ImgCarousel img={data.imageDTO} />

            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  style={{ width: "48px", height: "48px" }} // Avatar 크기 조정
                >
                  <img
                    src={data.sellerDTO.profileURL}
                    alt="profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }} // 이미지 크기 및 모양 조정
                  />
                </Avatar>
              }
              onClick={() => getMember(data.sellerDTO.id)}
              action={
                <IconButton aria-label="settings">
                  <Typography variant="body1" color="textPrimary">
                    {data.sellerDTO.score}℃
                    <ThermostatIcon />
                  </Typography>
                </IconButton>
              }
              title={
                <Typography variant="h6" color="textPrimary">
                  {data.sellerDTO.nickname}
                  <br />
                </Typography>
              }
              // subheader={data.dong}
              subheader={
                <Typography variant="subtitle2" color="textSecondary">
                  {data.dong}
                </Typography>
              }
            />
          </Card>
          <CardContent>
            <Typography variant="h6" color="textPrimary" sx={{ mb: 1 }}>
              <b>{data.title}</b>
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 3 }}>
              {data.categoryName}&nbsp; {formatTimeAgo(data.regDate)}
            </Typography>
            <Typography variant="body2" color="textPrimary" sx={{ mt: 3 }}>
              {data.content}
            </Typography>
          </CardContent>
          <GetProductBottomBar
            data={data}
            isMine={isMine}
            productId={data.id}
          />
        </>
      ) : (
        <LoadingProgress />
      )}
      <MarginEmpty />
    </>
  );
};
export default ProductGet;
