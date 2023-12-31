import * as React from "react";
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import ListContainingProduct from "../../component/product/ListContainingProduct";
import { ListProductAPI } from "../../apis/api/Product";
import LoadingProgress from "../../component/common/LoadingProgress";
import MarginEmpty from "../../component/payment/MarginEmpty";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import NotData from "../../component/product/NotData";

const ProductCategoryList = () => {
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const listProduct = async () => {
    try {
      const result = await ListProductAPI("", state.categoryIndex);
      setData(result.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listProduct();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingProgress />
      ) : (
        <>
          <Back url="/product/list" />
          <TopBar>{state.category}</TopBar>

          {data.length > 0 ? (
            <>
              <MarginEmpty />
              <ListContainingProduct type="report" data={data} />
            </>
          ) : (
            <NotData>
              <div style={{ color: "lightgray" }}>해당 카테고리에</div>
              <div style={{ color: "lightgray" }}>상품이 존재하지 않아요.</div>
            </NotData>
          )}
          <br />
          <br />
        </>
      )}{" "}
    </>
  );
};
export default ProductCategoryList;
