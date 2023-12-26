import * as React from "react";
import ProductForm from "../../component/product/ProductForm";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";

const ProductAdd = () => {
  return (
    <>
      <Back />
      <TopBar>상품 등록</TopBar>
      <MarginEmpty />
      <ProductForm text="상품등록" />
    </>
  );
};

export default ProductAdd;
