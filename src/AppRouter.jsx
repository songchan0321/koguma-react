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
import { useContext, useEffect, useRef } from "react";
import { CHAT_EVENT, SocketContext } from "./context/socket";
import {
  IsLoginContext,
  useIsLoginState,
} from "./context/LoginContextProvider";
import ProductList from "./pages/product/ProductList";

const AppRouter = ({ messageAlertHandler }) => {
  const socket = useContext(SocketContext);
  const isLogin = useIsLoginState(IsLoginContext);
  const socketIntervalRef = useRef(null);
  useEffect(() => {
    console.log("AppRouter mount");
    socket.emit(CHAT_EVENT.FIRST_CONNECT, {
      token: `${localStorage.token}`,
    });
    setInterval(() => {
      socketIntervalRef.current = socket.emit(CHAT_EVENT.FIRST_CONNECT, {
        token: `${localStorage.token}`,
      });
    }, 1000 * 60 * 5);

    socket.on(CHAT_EVENT.EVENT_ALERT, (message) => {
      messageAlertHandler(message);
    });
    return () => {
      clearInterval(socketIntervalRef.current);
    };
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
