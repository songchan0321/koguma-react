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


  const ProductAdd = () => {

    return (
        <ProductForm text="상품등록"/>
    );
  };

  export default ProductAdd;