import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useIsLoginState } from "../../context/LoginContextProvider";
import ChatRoomList from "./ListChatRoom";
import GetChatRoom from "./GetChatRoom";
import NewChatRoom from "./NewChatRoom";

const ChatRouter = () => {
  const isLogin = useIsLoginState();
  return (
    <Routes>
      <Route
        path="/list"
        element={isLogin ? <ChatRoomList /> : <Navigate to="/common/login" />}
      />
      <Route
        path="/get/:urlRoomId"
        element={isLogin ? <GetChatRoom /> : <Navigate to="/common/login" />}
      />
      <Route
        path="/get/new/:productId"
        element={isLogin ? <NewChatRoom /> : <Navigate to="/common/login" />}
      />

      {/* <Route path="/post/list" element={<ListPost />} />
            <Route path="/post/add" element={<AddPost />} /> */}
    </Routes>
  );
};

export default ChatRouter;
