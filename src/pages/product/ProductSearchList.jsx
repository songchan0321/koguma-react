import * as React from "react";
import { useEffect, useState } from "react";

import ListContainingProduct from "../../component/product/ListContainingProduct";
import { ListProductAPI } from "../../apis/api/Product";
import LoadingProgress from "../../component/common/LoadingProgress";
import NotData from "../../component/product/NotData";
import MarginEmpty from "../../component/payment/MarginEmpty";

const ProductSearchList = ({ query }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const listProduct = async () => {
    try {
      const { data } = await ListProductAPI(query);
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    listProduct();
  }, [query]);
  return (
    <>
      {loading ? (
        <LoadingProgress />
      ) : data.length > 0 ? (
        <>
          <MarginEmpty value={"8.0rem"} />
          <ListContainingProduct type="report" data={data} />
        </>
      ) : (
        <NotData>
          <div style={{ color: "lightgray" }}>검색된 상품이 없어요.</div>
        </NotData>
      )}
      <MarginEmpty />
    </>
  );
};
export default ProductSearchList;
