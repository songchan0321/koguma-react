import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopReturnBar from "./TopReturnBar";
import {
  Button,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  AppBar,
  Alert,
  AlertTitle,
} from "@mui/material";
import MyList from "../../component/product/MyList";
import MySaledList from "../../component/product/MySaledList";

import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import {
  listProductBySaleAPI,
  listProductByBuyAPI,
  raiseProductAPI,
  updateTradeStateAPI,
  deleteProductAPI,
} from "../../apis/api/Product";

const MySaleProduct = () => {
  //   const { clubId } = useParams();
  const navigate = useNavigate();
  const [selectedActionSale, setSelectedActionSale] = useState([
    {
      name: "예약중",
      action: (productId) => updateTradeState(productId, "RESERVATION"),
    },
    {
      name: "거래완료",
      action: (productId) => navigate(`/product/get/seller/${productId}`),
    },
    {
      name: "게시글 수정",
      action: (productId) => console.log(productId),
    },
    {
      name: "숨기기",
      action: (productId) => updateTradeState(productId, "HIDE"),
    },
    {
      name: "삭제",
      action: (productId) => deleteProduct(productId),
    },
  ]);
  const [selectedActionSaled, setSelectedActionSaled] = useState([
    {
      name: "판매중",
      action: (productId) => updateTradeState(productId, "SALE"),
    },
    {
      name: "게시글 수정",
      action: (productId) => console.log(productId),
    },
    {
      name: "숨기기",
      action: (productId) => updateTradeState(productId, "HIDE"),
    },
    {
      name: "삭제",
      action: (productId) => deleteProduct(productId),
    },
  ]);
  const [selectedActionReservation, setSelectedActionReservation] = useState([
    {
      name: "판매중",
      action: (productId) => updateTradeState(productId, "SALE"),
    },
    {
      name: "거래완료",
      action: (productId) => navigate(`/product/get/seller/${productId}`),
    },
    {
      name: "게시글 수정",
      action: (productId) => console.log(productId),
    },
    {
      name: "숨기기",
      action: (productId) => updateTradeState(productId, "HIDE"),
    },
    {
      name: "삭제",
      action: (productId) => deleteProduct(productId),
    },
  ]);
  const [selectedActionHide, setSelectedActionHide] = useState([
    {
      name: "게시글 수정",
      action: (productId) => console.log(productId),
    },
    {
      name: "삭제",
      action: (productId) => deleteProduct(productId),
    },
  ]);

  const [selectedMenu, setSelectedMenu] = useState("판매 중");
  const [selectedMenuType, setSelectedMenuType] = useState("SALE");
  const menuList = ["판매 중", "판매 완료", "예약 중", "숨김 중"];
  const menuListEng = ["SALE", "SALED", "RESERVATION", "HIDE"];
  const [alert, setAlert] = useState(null);

  const getProductReview = (productId) => {
    navigate(`/product/review/get/${productId}`);
  };
  const addHide = () => {
    alert("hide");
  };

  const handleMenuClick = (idx) => {
    setSelectedMenu(menuList[idx]);
    setSelectedMenuType(menuListEng[idx]);
  };

  const getProduct = (productId) => {
    navigate(`/product/get/${productId}`);
  };

  const raiseProduct = async (productId) => {
    try {
      const response = await raiseProductAPI(productId);
      console.log(response);
      setAlert(
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          끌어올리기 성공!
        </Alert>
      );
    } catch (err) {
      console.log(err);
      setAlert(
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {err.response.data}
        </Alert>
      );
    }
  };
  const updateTradeState = async (prodcutId, type) => {
    // 상품 상태 변경 axios 요청
    await updateTradeStateAPI(prodcutId, type);
  };
  const updateTradeStateByReservation = async (prodcutId) => {
    //예약중인 상품을 판매중으로 변경
    await updateTradeStateAPI(prodcutId, "SALE");
  };
  const deleteProduct = async (productId) => {
    await deleteProductAPI(productId);
  };

  return (
    <>
      <Back url="/member/profile" />
      <TopBar>내 판매 내역</TopBar>
      <MarginEmpty />
      <MarginEmpty value={"160px"} />
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "#ffffff",
          zIndex: 90,
        }}
      >
        <MarginEmpty value={"50px"} />
        <CardHeader
          sx={{ m: 4, color: "black" }}
          title="나의 판매내역"
          // avatar={<Avatar aria-label="recipe">R</Avatar>}
        />

        <div style={{ display: "flex", width: "100%" }}>
          {menuList.map((menu, idx) => (
            <Button
              key={menu}
              onClick={() => handleMenuClick(idx)}
              variant={selectedMenu === menu ? "contained" : "outlined"}
              color="secondary"
              style={{ flex: 1 }}
            >
              {menu}
            </Button>
          ))}
        </div>
      </AppBar>

      <hr></hr>

      {selectedMenu === "판매 중" && (
        <MyList
          selectedMenuType={selectedMenuType}
          buttonNM="끌어올리기"
          onClick={raiseProduct}
          onClickGetProduct={getProduct}
          selectedActions={selectedActionSale}
        />
      )}

      {selectedMenu === "판매 완료" && (
        <MySaledList
          selectedMenuType={selectedMenuType}
          buttonNM="받은 후기 보기"
          onClick={getProductReview}
          onClickGetProduct={getProduct}
          selectedActions={selectedActionSaled}
        />
      )}
      {selectedMenu === "예약 중" && (
        <MyList
          selectedMenuType={selectedMenuType}
          buttonNM="예약 해제"
          onClick={updateTradeStateByReservation}
          onClickGetProduct={getProduct}
          selectedActions={selectedActionReservation}
        />
      )}
      {selectedMenu === "숨김 중" && (
        <MyList
          selectedMenuType={selectedMenuType}
          buttonNM="숨기기 해제"
          onClick={addHide}
          onClickGetProduct={getProduct}
          selectedActions={selectedActionHide}
        />
      )}
    </>
  );
};

export default MySaleProduct;
