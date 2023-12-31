import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useIsLoginState } from "../../context/LoginContextProvider";
import ChatRoomList from "./ListChatRoom";
import GetChatRoom from "./GetChatRoom";
import NewChatRoom from "./NewChatRoom";
import DoingCall from "./call/DoingCall";
import PendingCall from "./call/PendingCall";

const ChatRouter = () => {
  const isLogin = useIsLoginState();
  return (
    <Routes>
      <Route
        path="/list"
        element={isLogin ? <ChatRoomList /> : <Navigate to="/common/login" />}
      />
      <Route
        path="/list/:productId"
        element={isLogin ? <ChatRoomList /> : <Navigate to="/common/login" />}
      />
      <Route
        path="/get/:urlRoomId"
        element={isLogin ? <GetChatRoom /> : <Navigate to="/common/login" />}
      />
      <Route
        path="/new"
        element={isLogin ? <NewChatRoom /> : <Navigate to="/common/login" />}
      />
      <Route path="/call/pending" element={<PendingCall />} />
      <Route path="/call/doing" element={<DoingCall />} />
    </Routes>
  );
};

export default ChatRouter;
