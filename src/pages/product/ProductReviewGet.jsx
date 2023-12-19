import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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
import { getReviewAPI } from "../../apis/api/Product";

import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import NotData from "../../component/product/NotData";

const ProductReviewGet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [review, setReview] = useState();
  console.log(location.state.isSeller, location.state.productId);
  const getReview = async () => {
    await getReviewAPI(location.state.productId, location.state.isSeller)
      .then((data) => setReview(data))
      .then(console.log(review));
  };

  const getReviewOther = () => {
    navigate(`/product/get/review`, {
      state: {
        isSeller: !review.seller,
        productId: review.productDTO.id,
      },
    });
  };
  useEffect(() => {
    getReview();
  }, [location]);

  return (
    <>
      <Back url={"/product/list/sale"} />
      <TopBar>거래 후기 </TopBar>
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
        {review ? (
          <>
            <Typography variant="h6" gutterBottom>
              {review.productDTO.sellerDTO.nickname}님이 보낸 후기가 도착했어요
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {review.memberDTO.nickname}님과 {review.productDTO.title}{" "}
              거래했어요
            </Typography>
            <Card sx={{ width: "90%" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/login/mayuko-vermeulen--4HCai3y6yY-unsplash.jpg"
                  alt="green iguana"
                />
                <CardContent sx={{ width: "90%" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {review.memberDTO.nickname}님
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {review.commet.map((commet, idx) => {
                      return <div>{commet}</div>;
                    })}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </>
        ) : (
          <>
            <NotData>작성된 리뷰가 없어요.</NotData>
          </>
        )}
      </Box>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Button
          onClick={() => getReviewOther()}
          fullWidth
          color="secondary"
          variant="contained"
        >
          상대가 보낸 후기 보기
        </Button>
      </Paper>
    </>
  );
};

export default ProductReviewGet;
