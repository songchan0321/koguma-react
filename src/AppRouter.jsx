import { Route, Routes } from "react-router-dom";
import Home from "./component/product/Home";
import GetPayment from "./pages/payment/GetPayment";
import AddPayment from "./pages/payment/AddPayment";
import ListPost from "./pages/community/ListPost";
import AddPost from "./pages/community/AddPost";

const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/product/list" element={<Home />} /> */}

      <Route path="/payment/get" element={<GetPayment />} />
      <Route path="/payment/add" element={<AddPayment />} />

      <Route path="/post/list" element={<ListPost />} />
      <Route path="/post/add" element={<AddPost />} />
    </Routes>
  );
};

export default AppRouter;
