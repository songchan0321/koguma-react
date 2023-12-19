import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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

import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import { addReviewAPI, getProductAPI } from "../../apis/api/Product";
const ProductReviewAdd = () => {
  //   const { clubId } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState();
  const [review, setReview] = useState({
    productDTO: product,
    rating: undefined,
    commet: [],
    content: "",
    seller: location.state.seller,
  });
  const navigate = useNavigate();

  console.log(location.state.productId);
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
  const addReview = async () => {
    try {
      const data = await addReviewAPI(review);
      await navigate(`/product/get/review`, {
        state: {
          isSeller: location.state.seller,
          productId: data.productDTO.id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getProduct = async () => {
    try {
      const data = await getProductAPI(location.state.productId);
      setProduct(data);

      // 상태 업데이트를 비동기적으로 처리하기 위해 함수 인자로 이전 상태를 받는 형태로 업데이트
      setReview((prevReview) => ({
        ...prevReview,
        productDTO: data,
        rating: undefined,
        commet: [],
        content: "",
        seller: true,
      }));

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Back url={"/product/list/sale"} />
      <TopBar>후기 작성하기</TopBar>
      <MarginEmpty value="60px" />
      {product && (
        <>
          <ReviewProductBar data={product} />
          <BasicRating
            buyer={product.buyerDTO.nickname}
            rating={review.rating}
            setRating={(newValue) => setReview({ ...review, rating: newValue })}
          />
        </>
      )}
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
            onClick={() => addReview()}
            // onClick={() => console.log(review)}
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
