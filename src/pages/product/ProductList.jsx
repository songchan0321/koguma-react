import * as React from "react";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import BottomBar from "../../component/common/BottomBar";
import ProductTopBar from "../../component/product/ProductTopBar";
import AddFloatingButton from "../../component/common/AddFloatingButton";
import ListContainingProduct from "../../component/product/ListContainingProduct";
import { ListProductAPI } from "../../apis/api/Product";
import LoadingProgress from "../../component/common/LoadingProgress";
import MarginEmpty from "../../component/payment/MarginEmpty";
import { loginMemberhasLocationAPI } from "../../apis/api/common";

const ProductList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [location, setLocation] = useState();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
    }
  };

  // useEffect(() => {
  //   loginMemberhasLocation();
  // }, []);
  useEffect(() => {
    listProduct();
  }, [location]);
  return (
    <>
      <ProductTopBar
        location={location}
        setLocation={setLocation}
        handleCategory={handleCategoryClick}
      />
      <MarginEmpty value={80}></MarginEmpty>
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
