import * as React from "react";

import {
  Avatar,
  Button,
  CssBaseline,
  Backdrop,
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Fragment, useEffect, useState } from "react";
import {
  addSuggestPriceAPI,
  getProductAPI,
  memberchecAPI,
} from "../../apis/api/Product";
import BottomBar from "../../component/common/BottomBar";
import ProductTopBar from "../../component/product/ProductTopBar";
import AddFloatingButton from "../../component/common/AddFloatingButton";
import ListContainingProduct from "../../component/product/ListContainingProduct";

import { useParams } from "react-router-dom";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import ContainingProduct from "../../component/product/ContainingProduct";
import LoadingProgress from "../../component/common/LoadingProgress";
import InputAdornment from "@mui/material/InputAdornment";

const SuggestPrice = () => {
  const [productDTO, setProductDTO] = useState(null);
  const navigator = useNavigate();
  const { productId } = useParams();
  const [formattedPrice, setFormattedPrice] = useState(""); // 가격 표시용
  const [numericPrice, setNumericPrice] = useState(null); // 실제 가격

  const handlePriceChange = (event) => {
    let inputValue = event.target.value.replace(/[^0-9]/g, "");

    // 콤마로 포맷된 문자열 생성
    const formattedValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setFormattedPrice(formattedValue);

    // 숫자 값으로 상태 업데이트
    setNumericPrice(parseInt(inputValue, 10));
  };
  const addSuggestPrice = async (suggest) => {
    return await addSuggestPriceAPI(suggest);
  };

  const handleSubmit = () => {
    const submitData = {
      productId: productDTO.id,

      price: numericPrice,
    };

    const { data } = addSuggestPrice(submitData);
    navigator(-1);
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
              maxLength: 10, // 10자리의 숫자 + 3자리의 콤마
            },
            endAdornment: <InputAdornment position="end">원</InputAdornment>,
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
