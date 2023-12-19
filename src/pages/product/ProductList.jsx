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
import MarginEmpty from "../../component/payment/MarginEmpty";

const ProductList = () => {
  const navigator = useNavigate();
  const [data, setData] = useState(null);
  const [location, setLocation] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ListProductAPI();
        setData(result.data);
        console.log(location);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location]);
  useEffect(() => {
    // dong이 변경된 후에 실행될 작업
    console.log(location);

    // dong이 변경된 후에 데이터를 다시 불러와서 처리
    const fetchDataAfterDongUpdate = async () => {
      try {
        const result = await ListProductAPI();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data after dong update:", error);
      }
    };

    fetchDataAfterDongUpdate();
  }, [location]);
  return (
    <>
      <ProductTopBar location={location} setLocation={setLocation} />
      <MarginEmpty value={60}></MarginEmpty>
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
