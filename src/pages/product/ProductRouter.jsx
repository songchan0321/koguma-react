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

const ProductRouter = () => {
  return (
    <Routes>
      {/* <Route path="/:prodNo" element={<Product />}/>
            <Route />
            <Route path="/form" element={<ProductForm />} />
            <Route path="/main" element={<Main />}/> */}
      <Route path="/get/:productId" element={<ProductGet />} />
      <Route path="/update/:productId" element={<ProductUpdate />} />
      <Route path="/list" element={<ProductList />} />
      <Route path="/add" element={<ProductAdd />} />
      <Route path="/suggest/:productId" element={<SuggestPrice />} />
      <Route path="/list/sale" element={<MySaleProduct />} />
      <Route path="/list/buy" element={<MyBuyProduct />} />
      <Route path="/list/like" element={<LikeProductList />} />
      <Route path="/review/add" element={<ProductReviewAdd />} />
      <Route path="/review/get" element={<ProductReviewGet />} />
      <Route path="/suggest/list" element={<ListSuggestPrice />} />
    </Routes>
  );
};

export default ProductRouter;
