import * as React from "react";
import { useState } from "react";
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
import { formatMoney } from "../../apis/services/payment";
import ProductForm from "../../component/product/ProductForm";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";

const ProductAdd = () => {
  return (
    <>
      <Back />
      <TopBar>상품 등록</TopBar>
      <MarginEmpty />
      <ProductForm text="상품등록" />
    </>
  );
};

export default ProductAdd;
