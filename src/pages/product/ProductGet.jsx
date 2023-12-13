import * as React from "react";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
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
  const productId = useParams();
  return (
    <>
      <TopReturnBar title="상품 조회" />
      <Card sx={{ maxWidth: "100%" }}>
        <CardMedia
          component="img"
          height="400"
          image="/photo.png"
          alt="Paella dish"
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
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
      </Card>
      <CardContent>
        <Typography variant="h4" color="text.secondary">
          상품 제목
        </Typography>
        <Typography variant="h6" color="text.secondary">
          카테고리
        </Typography>
        <Typography variant="body1" color="text.secondary">
          본문
        </Typography>
      </CardContent>
      <GetProductBottomBar productId={productId} />
    </>
  );
};
export default ProductGet;
