import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopReturnBar from "./TopReturnBar";
import {
  Button,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MyList from "../../component/product/MyList";
import BasicRating from "../../component/product/Rating";
import Commet from "../../component/product/Commet";
import ReviewProductBar from "../../component/product/ReviewProductBar";

const ProductReviewAdd = () => {
  //   const { clubId } = useParams();
  const [product, setProduct] = useState({});
  const [review, setReview] = useState({
    rating: undefined,
    commet: [],
    content: "",
  });

  const commetHandler = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };
  const handleCheckboxChange = (value) => {
    const updatedCommets = [...review.commet];
    if (updatedCommets.includes(value)) {
      const index = updatedCommets.indexOf(value);
      updatedCommets.splice(index, 1);
    } else {
      updatedCommets.push(value);
    }
    console.log(updatedCommets);
    setReview({
      ...review,
      commet: updatedCommets,
    });
  };
  const checkBoxClear = () => {
    setReview({
      ...review,
      commet: [],
    });
  };

  return (
    <>
      <TopReturnBar />
      <ReviewProductBar />
      <BasicRating
        rating={review.rating}
        setRating={(newValue) => setReview({ ...review, rating: newValue })}
      />
      {review.rating && (review.rating === 1 || review.rating === 2) ? (
        <Commet
          type="bad"
          commetHandler={commetHandler}
          checkboxHandler={handleCheckboxChange}
          checkBoxClear={checkBoxClear}
        />
      ) : null}
      {review.rating &&
      (review.rating === 3 || review.rating === 4 || review.rating === 5) ? (
        <Commet
          type="good"
          commetHandler={commetHandler}
          checkboxHandler={handleCheckboxChange}
          checkBoxClear={checkBoxClear}
        />
      ) : null}
      {review.rating && (
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <Button
            onClick={() => console.log(review)}
            fullWidth
            color="secondary"
            variant="contained"
          >
            거래후기 등록하기
          </Button>
        </Paper>
      )}
    </>
  );
};

export default ProductReviewAdd;
