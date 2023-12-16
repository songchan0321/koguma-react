import {
  Avatar,
  Button,
  CssBaseline,
  Backdrop,
  Box,
  Typography,
  Card,
  CardHeader,
  IconButton,
  MoreVertIcon,
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

import { formatMoney } from "../../apis/services/product";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";

const ProductList = () => {
  const navigator = useNavigate();

  return (
    <>
      <Back />
      <TopBar>가격제안 리스트</TopBar>
      <MarginEmpty />

      <Card sx={{ maxWidth: "100%" }}>
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          // onClick={() => getMember(data.sellerDTO.id)}

          title={
            <Box>
              <Typography variant="h6" color="textSecondary">
                푸근푸근
              </Typography>
            </Box>
          }
          subheader={
            <>
              <Typography variant="subtitle2" color="textSecondary">
                역삼 1동
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography variant="h6" color="textSecondary">
                    {formatMoney(40000)}원
                  </Typography>
                </div>
              </Box>
            </>
          }
        />
      </Card>
    </>
  );
};
export default ProductList;
