import { Route, Routes } from "react-router-dom";
import Home from "./component/product/Home";

import ListPost from "./pages/community/ListPost";
import AddPost from "./pages/community/AddPost";

import ChatRouter from "./pages/chat/ChatRouter";
import ClubRouter from "./pages/club/ClubRouter";
import CommonRouter from "./pages/common/CommonRouter";
import CommunityRouter from "./pages/community/Community";
import MemberRouter from "./pages/member/MemberRouter";
import PaymentRouter from "./pages/payment/PaymentRouter";
import ProductRouter from "./pages/product/ProductRouter";

const AppRouter = () => {
  return (
    <Routes>
      
      <Route path="/post/list" element={<ListPost />} />   {/* community/post ? */}
      <Route path="/post/add" element={<AddPost />} />

      <Route path="/chat/*" element={<ChatRouter />} />
      <Route path="/club/*" element={<ClubRouter />} />
      <Route path="/common/*" element={<CommonRouter />} />
      <Route path="/comunity/*" element={<CommunityRouter />} />
      <Route path="/member/*" element={<MemberRouter />} />
      <Route path="/payment/*" element={<PaymentRouter />} />
      <Route path="/product/*" element={<ProductRouter />} />
    </Routes>
  );
};

export default AppRouter;
