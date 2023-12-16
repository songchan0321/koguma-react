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
  CardActions,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

import { Fragment, useEffect, useState } from "react";
import { listSuggestPriceAPI, memberchecAPI } from "../../apis/api/Product";
import BottomBar from "../../component/common/BottomBar";
import ProductTopBar from "../../component/product/ProductTopBar";
import AddFloatingButton from "../../component/common/AddFloatingButton";
import ListContainingProduct from "../../component/product/ListContainingProduct";

import { formatMoney } from "../../apis/services/product";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import NotData from "../../component/product/NotData";
import SuggestPriceComponent from "../../component/product/SuggestPriceComponent";

const ProductList = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState(null);
  const { productId } = useParams();

  const getMember = (memberId) => {
    navigate(`/member/other/get/${memberId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await listSuggestPriceAPI(productId);
        setDatas(result);
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
      <TopBar>가격제안 리스트</TopBar>
      <MarginEmpty />

      {datas ? (
        datas.map((data, idx) => {
          return <SuggestPriceComponent data={data} />;
        })
      ) : (
        <NotData />
      )}
    </>
  );
};
export default ProductList;
