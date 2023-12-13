import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./component/product/Home";

// import ListPost from "./pages/community/ListPost";
// import AddPost from "./pages/community/AddPost";

import ChatRouter from "./pages/chat/ChatRouter";
import ClubRouter from "./pages/club/ClubRouter";
import CommonRouter from "./pages/common/CommonRouter";
import MemberRouter from "./pages/member/MemberRouter";
import PaymentRouter from "./pages/payment/PaymentRouter";
import ProductRouter from "./pages/product/ProductRouter";
import CommunityRouter from "./pages/community/CommunityRouter";
import { useContext, useEffect } from "react";
import { CHAT_EVENT, SocketContext } from "./context/socket";
import {
  IsLoginContext,
  useIsLoginState,
} from "./context/LoginContextProvider";
import ProductList from "./pages/product/ProductList";

const AppRouter = () => {
  const socket = useContext(SocketContext);
  const isLogin = useIsLoginState(IsLoginContext);
  useEffect(() => {
    socket.emit(CHAT_EVENT.FIRST_CONNECT, {
      token: `${localStorage.token}`,
    });
    socket.on(CHAT_EVENT.EVENT_ALERT, (message) => {
      console.log("알림 발생!");
      console.log(message);
    });
  }, []);
  return (
    <Routes>
      {/* <Route path="/post/list" element={<ListPost />} />   community/post ? */}
      {/* <Route path="/post/add" element={<AddPost />} /> */}
      <Route
        path="/"
        element={isLogin ? <ProductList /> : <Navigate to="/common/login" />}
      />
      <Route path="/chat/*" element={<ChatRouter />} />
      <Route path="/club/*" element={<ClubRouter />} />
      <Route path="/common/*" element={<CommonRouter />} />
      <Route path="/post/*" element={<CommunityRouter />} />
      <Route path="/member/*" element={<MemberRouter />} />
      <Route path="/payment/*" element={<PaymentRouter />} />
      <Route path="/product/*" element={<ProductRouter />} />
    </Routes>
  );
};

export default AppRouter;
