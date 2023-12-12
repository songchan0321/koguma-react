import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import ProductAdd from "./ProductAdd";
import ProductGet from "./ProductGet";
import ProductUpdate from "./ProductUpdate";
import SuggestPrice from "./SuggestPrice";

const ProductRouter = () => {
  return (
    <Routes>
      {/* <Route path="/:prodNo" element={<Product />}/>
            <Route />
            <Route path="/form" element={<ProductForm />} />
            <Route path="/main" element={<Main />}/> */}
      <Route path="/get/:prodNo" element={<ProductGet />} />
      <Route path="/update/:prodNo" element={<ProductUpdate />} />
      <Route path="/list" element={<ProductList />} />
      <Route path="/add" element={<ProductAdd />} />
      <Route path="/suggest/:prodNo" element={<SuggestPrice />} />
    </Routes>
  );
};

export default ProductRouter;
