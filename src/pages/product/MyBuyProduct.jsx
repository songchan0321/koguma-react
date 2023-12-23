import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopReturnBar from "./TopReturnBar";
import {
  Button,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MyList from "../../component/product/MyList";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import MySaledList from "../../component/product/MySaledList";
import { updateTradeStateAPI } from "../../apis/api/Product";

const MyBuyProduct = () => {
  //   const { clubId } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  const getProductReview = async (productId) => {
    await navigate(`/product/get/review`, {
      state: {
        isSeller: true,
        productId: productId,
      },
    });
  };
  const [selectedAction, setSelectedAction] = useState([
    {
      name: "목록에서 제외하기",
      action: (productId) => updateTradeState(productId, "SALE"),
    },
  ]);
  const updateTradeState = async (prodcutId, type) => {
    // 상품 상태 변경 axios 요청
    await updateTradeStateAPI(prodcutId, type);
  };
  const getProduct = (productId) => {
    navigate(`/product/get/${productId}`);
  };

  return (
    <>
      <Back />
      <TopBar>내 구매 목록</TopBar>
      <MarginEmpty />

      <MySaledList
        buttonNM="받은 후기 보기"
        selectedMenuType={"BUY"}
        onClick={getProductReview}
        onClickGetProduct={getProduct}
        selectedActions={selectedAction}
      />
    </>
  );
};

export default MyBuyProduct;
