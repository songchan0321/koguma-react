import React from "react";
import { Route, Routes } from "react-router-dom";
import GetPayment from "./GetPayment";
import AddPayment from "./AddPayment";
import ChargePoint from "./ChargePoint";
import SuccessPayment from "./SuccessPayment";

const PaymentRouter = () => {
  return (
    <Routes>
      <Route path="/get" element={<GetPayment />} />
      <Route path="/add" element={<AddPayment />} />
      <Route path="/charge" element={<ChargePoint />} />
      <Route path="/success/:type" element={<SuccessPayment />} />
    </Routes>
  );
};

export default PaymentRouter;
