import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../../component/common/Login";
import KakaoLoginAPI from "../../component/common/KakaoLoginAPI";
import AuthLocation from "../common/AuthLocation";
import KakaoLogin from "../../component/common/KakaoLogin";

const CommonRouter = () => {
  return (
    <Routes>
      {/* <Route path="/post/list" element={<ListPost />} />
            <Route path="/post/add" element={<AddPost />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/kakao/callback" element={<KakaoLogin />} />
      <Route path="/location" element={<AuthLocation />} />
    </Routes>
  );
};

export default CommonRouter;
