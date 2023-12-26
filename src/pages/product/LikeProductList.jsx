import * as React from "react";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { getProductLikeListAPI } from "../../apis/api/Product";
import ListContainingProduct from "../../component/product/ListContainingProduct";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import LoadingProgress from "../../component/common/LoadingProgress";
import NotData from "../../component/product/NotData";

const ProductList = () => {
  const navigator = useNavigate();
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await getProductLikeListAPI();
      setProduct(data);
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Back />
      <TopBar>관심 상품 리스트</TopBar>
      {loading ? (
        <LoadingProgress />
      ) : product.length > 0 ? (
        <>
          <MarginEmpty />
          {product && <ListContainingProduct data={product} type={"like"} />}
        </>
      ) : (
        <NotData>
          <div style={{ color: "lightgray" }}>관심상품이 존재하지 않아요.</div>
        </NotData>
      )}
    </>
  );
};
export default ProductList;
