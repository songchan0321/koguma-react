import * as React from "react";
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import BottomBar from "../../component/common/BottomBar";
import ProductTopBar from "../../component/product/ProductTopBar";
import AddFloatingButton from "../../component/common/AddFloatingButton";
import ListContainingProduct from "../../component/product/ListContainingProduct";
import { ListProductAPI } from "../../apis/api/Product";
import LoadingProgress from "../../component/common/LoadingProgress";
import MarginEmpty from "../../component/payment/MarginEmpty";
import { loginMemberhasLocationAPI } from "../../apis/api/common";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import NotData from "../../component/product/NotData";

const ProductCategoryList = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const listProduct = async () => {
    try {
      const result = await ListProductAPI("", state.categoryIndex);
      setData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listProduct();
  }, []);
  return (
    <>
      <Back url="/product/list" />
      <TopBar>{state.category}</TopBar>
      <MarginEmpty />
      {data ? (
        <ListContainingProduct type="report" data={data} />
      ) : (
        <NotData>
          <div>해당 카테고리에 상품이 존재하지 않아요.</div>
        </NotData>
      )}
      <br />
      <br />
    </>
  );
};
export default ProductCategoryList;