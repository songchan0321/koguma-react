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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GetProductBottomBar from "./GetProductBottomBar";
import TopReturnBar from "./TopReturnBar";
import Carousel from "react-material-ui-carousel";
import TopBar from "../../component/payment/TopBar";
import { getProductAPI } from "../../apis/api/Product";
import LoadingProgress from "../../component/common/LoadingProgress";

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
  const [data, setData] = useState(null);
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <TopBar children={"상품 조회"} />
      {data ? (
        <>
          <Card sx={{ maxWidth: "100%" }}>
            <CardMedia
              component="img"
              height="400"
              image={
                data.imageDTO && data.imageDTO.length > 0
                  ? data.imageDTO[0].url
                  : "/photo.png"
              }
              alt="/photo.png"
            />
            {/* <Carousel>
          {sources.map((item) => (
            <Paper key={item.id}>
              <img src={item.src} alt='' />
            </Paper>))}
        </Carousel> */}
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              onClick={() => getMember(data.sellerDTO.id)}
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={data.sellerDTO.nickname}
              subheader={data.dong}
            />
          </Card>
          <CardContent>
            <Typography variant="h4" color="text.secondary">
              {data.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {data.categoryName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {data.content}
            </Typography>
          </CardContent>
          <GetProductBottomBar data={data} />
        </>
      ) : (
        <LoadingProgress />
      )}
    </>
  );
};
export default ProductGet;
