import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import GetPayment from "./GetPayment";
import AddPayment from "./AddPayment";
import ChargePoint from "./ChargePoint";
import SuccessPayment from "./SuccessPayment";
import { useIsLoginState } from "../../context/LoginContextProvider";
import DeletePayment from "./DeletePayment";
import RequestRefundPoint from "./RequestRefundPoint";
import TransferPoint from "./TransferPoint";

const PaymentRouter = () => {
  const isLogin = useIsLoginState();
  return (
    <Routes>
      <Route
        path="/get"
        element={isLogin ? <GetPayment /> : <Navigate to="/common/login" />}
      />
      <Route
        path="/add"
        element={isLogin ? <AddPayment /> : <Navigate to="/common/login" />}
      />
      <Route
        path="/charge"
        element={isLogin ? <ChargePoint /> : <Navigate to="/common/login" />}
      />
      <Route
        path="/transfer"
        element={isLogin ? <TransferPoint /> : <Navigate to="/common/login" />}
      />
      <Route
        path="/requestRefund"
        element={
          isLogin ? <RequestRefundPoint /> : <Navigate to="/common/login" />
        }
      />
      <Route
        path="/success/:type"
        element={isLogin ? <SuccessPayment /> : <Navigate to="/common/login" />}
      />
      <Route
        path="/delete"
        element={isLogin ? <DeletePayment /> : <Navigate to="/common/login" />}
      />
    </Routes>
  );
};

export default PaymentRouter;
