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

const MyBuyProduct = () => {
  //   const { clubId } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const getProductReview = () => {
    navigate("/product/review/get");
  };
  const [selectedAction, setSelectedAction] = useState([
    {
      name: ["목록에서 제외하기"],
      //    action:[handleReservation(),
      //            '2','3','4','5,'
      //     ]
    },
  ]);
  const getProduct = (productId) => {
    navigate(`/product/get/${productId}`);
  };

  return (
    <>
      <Back />
      <TopBar>내 구매 목록</TopBar>
      <MarginEmpty />

      {selectedAction && (
        <MyList
          buttonNM="받은 후기 보기"
          onClick={getProductReview}
          onClickGetProduct={getProduct}
          selectedActions={selectedAction[0]}
        />
      )}
    </>
  );
};

export default MyBuyProduct;
