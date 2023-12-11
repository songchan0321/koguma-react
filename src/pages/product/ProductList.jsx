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

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Fragment, useEffect, useState } from "react";
import { memberchecAPI } from "../../apis/api/Product";

const ProductList = () => {
  const navigator = useNavigate();
    // console.log(localStorage.getItem("token"));
    // (async () => {
    //     try {
    //       const data = await memberchecAPI();  //시큐리티 회원 확인 테스트용
          
    //       console.log(data)
    //     } catch (err) {
    //       console.error(err);
    //     } finally {
    //     }
    //   })();

    return (
        <>
            <Button
              type="submit"
              fullWidth
              color="secondary"
              variant="contained"
              onClick={()=>navigator("/product/add")}
              sx={{ mt: 3, mb: 2 }}
            >
              상품 등록
            </Button>
        </>
    );
};
export default ProductList;