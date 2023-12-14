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
import { memberchecAPI } from "../../apis/api/Product";
import BottomBar from "../../component/common/BottomBar";
import ProductTopBar from "../../component/product/ProductTopBar";
import AddFloatingButton from "../../component/common/AddFloatingButton";
import ListContainingProduct from "../../component/product/ListContainingProduct";

import { useParams } from "react-router-dom";
import TopReturnBar from "./TopReturnBar";
import ContainingProduct from "../../component/product/ContainingProduct";
import TopBar from "../../component/payment/TopBar";
const SuggestPrice = () => {
  const navigator = useNavigate();
  const { params } = useParams();
  return (
    <>
      <TopReturnBar title="상품 가격 제안" />
      <TopBar children={"상품 조회"} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <ContainingProduct />
        <TextField
          margin="normal"
          required
          fullWidth
          id="price"
          name="price"
          type="number" // type을 "text"로 변경
          label="제안 가격"
          //   value={formData.price} // 표시할 때 포맷팅된 값을 사용
          //   onChange={handlePriceChange}
          autoComplete="price"
        />
        <Button
          type="submit"
          fullWidth
          color="secondary"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          가격 제안하기
        </Button>
      </Box>
    </>
  );
};
export default SuggestPrice;
