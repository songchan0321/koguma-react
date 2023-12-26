import * as React from "react";
import { Button, Box, TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { Fragment, useEffect, useState } from "react";
import { addSuggestPriceAPI, getProductAPI } from "../../apis/api/Product";

import { useParams } from "react-router-dom";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import ContainingProduct from "../../component/product/ContainingProduct";
import LoadingProgress from "../../component/common/LoadingProgress";
import InputAdornment from "@mui/material/InputAdornment";
import { useModal } from "../../context/ModalContext";
import Modal from "../../component/common/Modal";

const SuggestPrice = () => {
  const [productDTO, setProductDTO] = useState(null);
  const navigator = useNavigate();
  const { productId } = useParams();
  const { openModal } = useModal();

  const [formattedPrice, setFormattedPrice] = useState(""); // 가격 표시용
  const [numericPrice, setNumericPrice] = useState(null); // 실제 가격

  const maxPrice = productDTO ? productDTO.price : 0;
  const handlePriceChange = (event) => {
    let inputValue = event.target.value.replace(/[^0-9]/g, "");

    const newNumericPrice = parseInt(inputValue, 10);

    // maxPrice보다 높아지지 않도록 체크
    if (newNumericPrice <= maxPrice) {
      // 콤마로 포맷된 문자열 생성
      const formattedValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      // 상태 업데이트
      setFormattedPrice(formattedValue);
      setNumericPrice(newNumericPrice);
    }
  };

  const addSuggestPrice = async (suggest) => {
    return await addSuggestPriceAPI(suggest);
  };

  const handleSubmit = async () => {
    const submitData = {
      productId: `${productDTO.id}`,

      price: `${numericPrice}`,
    };
    console.log(submitData);
    const { data } = await addSuggestPrice(submitData);

    await openModal("상품 수정 성공", true, () => {
      navigator(-1);
    });
  };
  console.log(productDTO);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProductAPI(productId);
        setProductDTO(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Back />
      <TopBar>가격 제안 하기</TopBar>
      <Modal />

      <MarginEmpty />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {productDTO ? (
          <ContainingProduct data={productDTO} />
        ) : (
          <LoadingProgress />
        )}

        <TextField
          margin="normal"
          required
          fullWidth
          id="price"
          name="price"
          type="text"
          label="제안 가격"
          value={formattedPrice}
          onChange={handlePriceChange}
          autoComplete="price"
          InputProps={{
            inputProps: {
              maxLength: 7, // 10자리의 숫자 + 3자리의 콤마
            },
            endAdornment: <InputAdornment position="end">원</InputAdornment>,
          }}
          inputProps={{
            max: maxPrice,
          }}
        />
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => handleSubmit()}
        >
          가격 제안하기
        </Button>
      </Box>
    </>
  );
};
export default SuggestPrice;
