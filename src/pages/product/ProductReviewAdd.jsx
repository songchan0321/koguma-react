import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Paper } from "@mui/material";
import BasicRating from "../../component/product/Rating";
import Commet from "../../component/product/Commet";
import ReviewProductBar from "../../component/product/ReviewProductBar";

import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import { addReviewAPI, getProductAPI } from "../../apis/api/Product";
import LoadingProgress from "../../component/common/LoadingProgress";
import { useModal } from "../../context/ModalContext";
import Modal from "../../component/common/Modal";
const ProductReviewAdd = () => {
  //   const { clubId } = useParams();
  const { state } = useLocation();
  const [product, setProduct] = useState();
  const { openModal } = useModal();
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState({
    productDTO: product,
    rating: undefined,
    commet: [],
    content: "",
  });
  const navigate = useNavigate();

  console.log(state.productId);
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

      await openModal("리뷰 등록 성공", true, () => {
        navigate(`/product/list/sale`, { replace: true });
      });
      setLoading(true);
    } catch (err) {
      await openModal("리뷰 등록 실패", false, () => {});
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async () => {
    try {
      const data = await getProductAPI(state.productId);
      setProduct(data);

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
      {loading ? (
        <LoadingProgress />
      ) : (
        <>
          <Back
            url={
              state?.roomId ? `/chat/get/${state.roomId}` : "/product/list/sale"
            }
          />
          <TopBar>후기 작성하기</TopBar>
          <MarginEmpty value="60px" />
          <Modal />
          {product && (
            <>
              <ReviewProductBar data={product} />
              <BasicRating
                buyer={product.buyerDTO.nickname}
                rating={review.rating}
                setRating={(newValue) =>
                  setReview({ ...review, rating: newValue })
                }
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
          (review.rating === 3 ||
            review.rating === 4 ||
            review.rating === 5) ? (
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
      )}
    </>
  );
};

export default ProductReviewAdd;
