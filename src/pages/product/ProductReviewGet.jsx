import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopReturnBar from "./TopReturnBar";
import {
  Button,
  CardHeader,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  IconButton,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MyList from "../../component/product/MyList";
import BasicRating from "../../component/product/Rating";
import Commet from "../../component/product/Commet";
import ReviewProductBar from "../../component/product/ReviewProductBar";

const ProductReviewGet = () => {
  //   const { clubId } = useParams();

  return (
    <>
      <TopReturnBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // 세로 중앙 정렬
          justifyContent: "center", // 가로 중앙 정렬
          height: "100vh", // 전체 화면 높이
          mt: 3,
          mb: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          000님이 보낸 후기가 도착했어요
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          000님과 xxx 거래했어요
        </Typography>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="/login/mayuko-vermeulen--4HCai3y6yY-unsplash.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                멀렁카우님.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Button
          onClick={() => console.log("myReview go")}
          fullWidth
          color="secondary"
          variant="contained"
        >
          내가 보낸 후기 보기
        </Button>
      </Paper>
    </>
  );
};

export default ProductReviewGet;
