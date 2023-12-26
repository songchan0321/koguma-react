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
import NotData from "../../component/product/NotData";

const ProductList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(true);

  const handleCategoryClick = (category, index) => {
    navigate("/product/list/category", {
      state: {
        category: category,
        categoryIndex: index,
      },
    });
  };
  const loginMemberhasLocation = async () => {
    try {
      await loginMemberhasLocationAPI().then((data) => {
        console.log(data);
        if (!data) {
          console.log(data);
          navigate("/common/location");
        }
      });
    } catch (error) {
      navigate("/common/location", { state: { init: true } });
    }
  };
  const listProduct = async () => {
    try {
      const result = await ListProductAPI();
      setData(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   loginMemberhasLocation();
  // }, []);
  useEffect(() => {
    console.log(location);
    listProduct();
  }, [location]);

  return (
    <>
      <ProductTopBar
        location={location}
        setLocation={setLocation}
        handleCategory={handleCategoryClick}
      />

      <BottomBar />
      <AddFloatingButton arrival={"/product/add"} />

      {loading ? (
        <LoadingProgress />
      ) : data.length > 0 ? (
        <>
          <MarginEmpty value={60}></MarginEmpty>
          <ListContainingProduct type="report" data={data} />
        </>
      ) : (
        <NotData>
          <div style={{ color: "lightgray" }}>해당 동네에 상품이 없어요.</div>
          <br />
          <div style={{ color: "lightgray" }}>다른 동네를 선택해 보세요.</div>
        </NotData>
      )}
      <MarginEmpty />
    </>
  );
};
export default ProductList;
