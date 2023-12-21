import * as React from "react";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import ProductUpdateForm from "../../component/product/ProductUpdateForm";

const ProductUpdate = () => {
  return (
    <>
      <Back />
      <TopBar>상품 수정</TopBar>
      <MarginEmpty />
      <ProductUpdateForm />
    </>
  );
};

export default ProductUpdate;
