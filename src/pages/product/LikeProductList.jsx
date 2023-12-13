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

const ProductList = () => {
  const navigator = useNavigate();

  return (
    <>
      <ProductTopBar />
      <BottomBar />
      <ListContainingProduct />
    </>
  );
};
export default ProductList;
