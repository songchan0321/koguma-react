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
import { useContext, useEffect, useRef, useState } from "react";
import { CHAT_EVENT, SocketContext } from "./context/socket";
import {
  IsLoginContext,
  useIsLoginState,
} from "./context/LoginContextProvider";
import ProductList from "./pages/product/ProductList";
import { getAlertCountAPI } from "./apis/api/alert";
import ListAlert from "./pages/common/ListAlert";
import SearchTab from "./pages/common/SearchTab";

const AppRouter = ({ messageAlertHandler }) => {
  const socket = useContext(SocketContext);
  const isLogin = useIsLoginState(IsLoginContext);
  const socketIntervalRef = useRef(null);
  const alertIntervalRef = useRef(null);
  // const [alertCount, setAlertCount] = useState(null);
  const alertCount = useRef(null);
  useEffect(() => {
    console.log("AppRouter mount");
    socket.emit(CHAT_EVENT.FIRST_CONNECT, {
      token: `${localStorage.token}`,
    });
    socketIntervalRef.current = setInterval(() => {
      if (isLogin) {
        socket.emit(CHAT_EVENT.FIRST_CONNECT, {
          token: `${localStorage.token}`,
        });
      }
    }, 1000 * 60 * 5);
    if (alertIntervalRef.current == null) {
      alertIntervalRef.current = setInterval(() => {
        (async () => {
          if (isLogin) {
            const { count } = await getAlertCountAPI();
            console.log(count);
            if (alertCount.current == null) {
              alertCount.current = count;
            } else {
              if (alertCount.current < count) {
                alertCount.current = count;
                alert(1);
                // feedback 추가!
              } else if (alertCount.current > count) {
                // 알림을 read 처리 한거겟죠
                alertCount.current = count;
                // feedback 추가 필요 x
              }
            }
          }
        })();
      }, 10000);
      clearInterval(alertIntervalRef.current);
    }
    socket.on(CHAT_EVENT.EVENT_ALERT, (message) => {
      messageAlertHandler(message);
    });
    return () => {
      console.log("AppRouter unmount");
      clearInterval(socketIntervalRef.current);
      clearInterval(alertIntervalRef.current);
    };
  }, []);
  return (
    <>
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
        <Route path="/alert/list" element={<ListAlert />} />
        <Route path="/search/tab" element={<SearchTab />} />
      </Routes>
    </>
  );
};

export default AppRouter;
