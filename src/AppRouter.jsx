import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import { CALL_EVENT, CHAT_EVENT, SocketContext } from "./context/socket";
import {
  IsLoginContext,
  useIsLoginState,
} from "./context/LoginContextProvider";
import { getAlertCountAPI } from "./apis/api/alert";
import ListAlert from "./pages/common/ListAlert";
import SearchTab from "./pages/common/SearchTab";
import Landing from "./Landing";
import { Alert, Slide, Snackbar } from "@mui/material";

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

const AppRouter = ({ messageAlertHandler }) => {
  const socket = useContext(SocketContext);
  const navigator = useNavigate();
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
    setTimeout(() => {
      handleClose();
    }, 10 * 1000);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            const { count } = await getAlertCountAPI().catch(() => {
              localStorage.clear("token");
              // navigator("/common/login");
            });
            if (alertCount.current == null) {
              if (count > 0) handleClick(TransitionRight)();
              alertCount.current = count;
            } else {
              if (alertCount.current < count) {
                alertCount.current = count;
                handleClick(TransitionRight)();
                // feedback 추가!
              } else if (alertCount.current > count) {
                // 알림을 read 처리 한거겟죠
                alertCount.current = count;
                // feedback 추가 필요 x
              }
            }
          }
        })();
      }, process.env.REACT_APP_ALERT_TIMEOUT);
      // clearInterval(alertIntervalRef.current);
    }
    socket.on(CHAT_EVENT.EVENT_ALERT, (message) => {
      messageAlertHandler(message);
    });

    socket.on(CALL_EVENT.CALL, (data) => {
      console.log("roomID!!!");
      console.log(data);
      navigator("/chat/call/pending", {
        state: {
          roomId: data.roomId,
          sourceMember: data.sourceMember,
          isOwner: false,
          next: window.location.pathname,
        },
      });
    });

    return () => {
      console.log("AppRouter unmount");
      clearInterval(socketIntervalRef.current);
      clearInterval(alertIntervalRef.current);
    };
  }, []);
  return (
    <>
      <div
        style={{
          position: "fixed",
          // top: "1rem",
          zIndex: 2000,
          width: "100%",
          opacity: "0.9",
        }}
      >
        <Snackbar
          open={open}
          sx={{ position: "absolute", top: 0, mt: "2rem" }}
          onClose={handleClose}
          TransitionComponent={transition}
          onClick={() => {
            handleClose();
            navigator("/alert/list");
          }}
          message="I love snacks"
          key={transition ? transition.name : ""}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            새로운 알림이 있어요!
          </Alert>
        </Snackbar>
      </div>
      {/* <Alert
          variant="filled"
          severity="info"
          onClick={() => navigator("/alert/list")}
        >
          `알림이 왔어요!`
        </Alert> */}
      <Routes>
        <Route path="/" element={<Landing />} />
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
