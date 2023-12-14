import * as React from "react";
import { useEffect, useState } from "react";

import { useInfiniteQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import BottomBar from "../../component/common/BottomBar";
import ProductTopBar from "../../component/product/ProductTopBar";
import AddFloatingButton from "../../component/common/AddFloatingButton";
import ListContainingProduct from "../../component/product/ListContainingProduct";
import { ListProductAPI } from "../../apis/api/Product";
import LoadingProgress from "../../component/common/LoadingProgress";

const ProductList = () => {
  const navigator = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ListProductAPI();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <ProductTopBar />
      <br />
      <br />
      <br />
      <BottomBar />
      <AddFloatingButton arrival={"/product/add"} />

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
export default ProductList;
