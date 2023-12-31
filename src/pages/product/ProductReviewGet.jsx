import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Paper } from "@mui/material";

import { getReviewAPI } from "../../apis/api/Product";

import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import NotData from "../../component/product/NotData";
import ReviewCard from "../../component/product/ReviewCard";
import LoadingProgress from "../../component/common/LoadingProgress";

const ProductReviewGet = () => {
  const { reviewId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [review, setReview] = useState();
  const [loading, setLoading] = useState(true);
  const getReview = async () => {
    try {
      await getReviewAPI(reviewId)
        .then((data) => setReview(data))
        .then(console.log(review));
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingProgress />
      ) : (
        <>
          <Back
            url={
              state?.roomId ? `/chat/get/${state.roomId}` : "/product/list/sale"
            }
          />
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
            {review && review ? (
              <>
                <ReviewCard review={review} />
              </>
            ) : (
              <>
                <NotData>
                  <div style={{ color: "lightgray" }}>
                    작성된 리뷰가 없어요.
                  </div>
                </NotData>
              </>
            )}
          </Box>

          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            {!review || review.myReviewId ? (
              <>
                <Button
                  onClick={() => navigate("/product/list/sale")}
                  fullWidth
                  color="secondary"
                  variant="contained"
                >
                  돌아가기
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() =>
                    navigate(`/product/review/add`, {
                      state: { productId: review.reviewDTO.productDTO.id },
                    })
                  }
                  fullWidth
                  color="secondary"
                  variant="contained"
                >
                  후기 작성하기
                </Button>
              </>
            )}
          </Paper>
        </>
      )}
    </>
  );
};

export default ProductReviewGet;
