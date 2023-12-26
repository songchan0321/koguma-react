import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";

const ReviewCard = ({ review }) => {
  return (
    <>
      {review.role === "seller" ? (
        <>
          <Typography variant="h6" gutterBottom>
            {review.reviewDTO.productDTO.buyerDTO.nickname}님이 보낸 후기가
            도착했어요
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {review.reviewDTO.productDTO.buyerDTO.nickname}님과{" "}
            {review.reviewDTO.productDTO.title} 거래했어요
          </Typography>
          <Card sx={{ width: "90%" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://koguma.kr.object.ncloudstorage.com/mayuko-vermeulen--4HCai3y6yY-unsplash.jpg"
                alt="green iguana"
              />
              <CardContent sx={{ width: "90%" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {review.reviewDTO.productDTO.sellerDTO.nickname}님
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.reviewDTO.commet.map((commet, idx) => {
                    return <div>{commet}</div>;
                  })}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            {review.reviewDTO.productDTO.sellerDTO.nickname}님이 보낸 후기가
            도착했어요
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {review.reviewDTO.productDTO.sellerDTO.nickname}님과{" "}
            {review.reviewDTO.productDTO.title} 거래했어요
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
                  {review.reviewDTO.productDTO.buyerDTO.nickname}님
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.reviewDTO.commet.map((commet, idx) => {
                    return <div>{commet}</div>;
                  })}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </>
      )}
    </>
  );
};

export default ReviewCard;
