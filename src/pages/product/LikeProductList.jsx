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
import { getProductLikeListAPI, memberchecAPI } from "../../apis/api/Product";
import BottomBar from "../../component/common/BottomBar";
import ProductTopBar from "../../component/product/ProductTopBar";
import AddFloatingButton from "../../component/common/AddFloatingButton";
import ListContainingProduct from "../../component/product/ListContainingProduct";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";

const ProductList = () => {
  const navigator = useNavigate();
  const [product, setProduct] = React.useState([]);

  const fetchData = async () => {
    try {
      const { data } = await getProductLikeListAPI();
      setProduct(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Back />
      <TopBar>관심 상품 리스트</TopBar>
      <MarginEmpty />
      {product && <ListContainingProduct data={product} type={"like"} />}
    </>
  );
};
export default ProductList;
