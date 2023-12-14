import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../../component/common/Login";
import KakaoLoginAPI from "../../component/common/KakaoLoginAPI";
import Location from "../common/Location";

const CommonRouter = () => {
  return (
    <Routes>
      {/* <Route path="/post/list" element={<ListPost />} />
            <Route path="/post/add" element={<AddPost />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/kakao/callback" element={<KakaoLoginAPI />} />
      {/* <Route path="/location" element={<Location />} /> */}
    </Routes>
  );
};

export default CommonRouter;
