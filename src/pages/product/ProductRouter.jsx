import React from 'react';
import { Route, Routes } from "react-router-dom";
import ProductList from './ProductList';

const ProductRouter = () => {
    return(
        <Routes>
            {/* <Route path="/:prodNo" element={<Product />}/>
            <Route />
            <Route path="/form" element={<ProductForm />} />
            <Route path="/main" element={<Main />}/> */}
            <Route path="/list" element={<ProductList />}/>
        </Routes>
    );
};

export default ProductRouter;