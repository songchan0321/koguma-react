import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useIsLoginState } from "../../context/LoginContextProvider";
import ChatRoomList from "./ListChatRoom";
import GetChatRoom from "./GetChatRoom";

const ChatRouter = () => {
  const isLogin = useIsLoginState();
  return (
    <Routes>
      <Route
        path="/list"
        element={isLogin ? <ChatRoomList /> : <Navigate to="/auth/login" />}
      />
      <Route
        path="/get/:roomId"
        element={isLogin ? <GetChatRoom /> : <Navigate to="/auth/login" />}
      />
      <Route
        path="/get/new/:productId"
        element={isLogin ? <GetChatRoom /> : <Navigate to="/auth/login" />}
      />

      {/* <Route path="/post/list" element={<ListPost />} />
            <Route path="/post/add" element={<AddPost />} /> */}
    </Routes>
  );
};

export default ChatRouter;
