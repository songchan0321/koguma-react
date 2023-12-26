import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useModal } from "../../context/ModalContext";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import MySaledList from "../../component/product/MySaledList";
import { updateTradeStateAPI } from "../../apis/api/Product";
import Modal from "../../component/common/Modal";

const MyBuyProduct = () => {
  const [change, setChange] = useState(0);
  const navigate = useNavigate();
  const { openModal } = useModal();

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
      action: async (productId) => {
        await openModal("구매목록에서 제외했습니다.", true, () => {});
        await updateTradeState(productId, "SALE");
      },
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
      <Modal />
      <MySaledList
        buttonNM="받은 후기 보기"
        selectedMenuType={"BUY"}
        onClick={getProductReview}
        onClickGetProduct={getProduct}
        selectedActions={selectedAction}
        setChange={setChange}
        change={change}
      />
    </>
  );
};

export default MyBuyProduct;
