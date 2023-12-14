import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import GetPayment from "./GetPayment";
import AddPayment from "./AddPayment";
import ChargePoint from "./ChargePoint";
import SuccessPayment from "./SuccessPayment";
import { useIsLoginState } from "../../context/LoginContextProvider";
import Login from "../../component/common/Login";
import DeletePayment from "./DeletePayment";

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
