import * as React from "react";
import { useEffect, useState } from "react";

import ListContainingProduct from "../../component/product/ListContainingProduct";
import { ListProductAPI } from "../../apis/api/Product";
import LoadingProgress from "../../component/common/LoadingProgress";

const ProductSearchList = ({ query }) => {
  const [data, setData] = useState(null);
  const listProduct = async () => {
    try {
      const result = await ListProductAPI(query);
      setData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listProduct();
  }, [query]);
  return (
    <>
      {data ? (
        <ListContainingProduct type="report" data={data} />
      ) : (
        <LoadingProgress />
      )}
      <br />
      <br />
    </>
  );
};
export default ProductSearchList;
