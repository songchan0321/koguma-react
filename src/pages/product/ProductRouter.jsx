import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import ProductAdd from "./ProductAdd";
import ProductGet from "./ProductGet";
import ProductUpdate from "./ProductUpdate";
import SuggestPrice from "./SuggestPrice";
import MySaleProduct from "./MySaleProduct";
import MyBuyProduct from "./MyBuyProduct";
import LikeProductList from "./LikeProductList";
import ProductReviewAdd from "./ProductReviewAdd";
import ProductReviewGet from "./ProductReviewGet";
import ListSuggestPrice from "./ListSuggestPrice";
import ListChoiceBuyer from "./ListChoiceBuyer";
import {
  IsLoginContext,
  useIsLoginState,
} from "../../context/LoginContextProvider";
import Login from "../../component/common/Login";
import ProductCategoryList from "./ProductCategoryList";
import ScrollToTop from "../../component/common/ScrollToTop";

const ProductRouter = () => {
  const isLogin = useIsLoginState(IsLoginContext);
  return (
    <ScrollToTop>
      <Routes>
        {/* <Route path="/:prodNo" element={<Product />}/>
            <Route />
            <Route path="/form" element={<ProductForm />} />
            <Route path="/main" element={<Main />}/> */}
        <Route path="/get/:productId" element={<ProductGet />} />
        <Route path="/update/:productId" element={<ProductUpdate />} />
        <Route path="/list/category" element={<ProductCategoryList />} />
        <Route path="/list" element={isLogin ? <ProductList /> : <Login />} />
        <Route path="/add" element={<ProductAdd />} />
        <Route path="/suggest/:productId" element={<SuggestPrice />} />
        <Route path="/list/sale" element={<MySaleProduct />} />
        <Route path="/list/buy" element={<MyBuyProduct />} />
        <Route path="/list/like" element={<LikeProductList />} />
        <Route path="/review/add" element={<ProductReviewAdd />} />
        <Route path="/get/review/:reviewId" element={<ProductReviewGet />} />
        <Route path="/suggest/list/:productId" element={<ListSuggestPrice />} />
        <Route path="/get/seller/:productId" element={<ListChoiceBuyer />} />
      </Routes>
    </ScrollToTop>
  );
};

export default ProductRouter;
