import { Route, Routes } from "react-router-dom";
import Home from "./component/product/Home";
import GetPayment from "./pages/payment/GetPayment";
import AddPayment from "./pages/payment/AddPayment";

const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/product/list" element={<Home />} /> */}

      <Route path="/payment/get" element={<GetPayment />} />
      <Route path="/payment/add" element={<AddPayment />} />
    </Routes>
  );
};

export default AppRouter;
