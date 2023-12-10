import React from 'react';
import { Route, Routes } from "react-router-dom";
import GetPayment from './GetPayment';
import AddPayment from './AddPayment';

const PaymentRouter = () => {
    return(
        <Routes>
            <Route path="/get" element={<GetPayment />} />
            <Route path="/add" element={<AddPayment />} />
        </Routes>
    );
};

export default PaymentRouter;