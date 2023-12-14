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
import TopBar from "../../component/payment/TopBar";

const ProductAdd = () => {
  return (
    <>
      <TopBar children={"상품 등록"} />
      <ProductForm text="상품등록" />
    </>
  );
};

export default ProductAdd;
