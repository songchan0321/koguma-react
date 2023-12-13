import React from "react";
import { Route, Routes } from "react-router-dom";
import ListPost from "./ListPost";
import AddPost from "./AddPost";
import GetPost from "./GetPost";
import CommnunityByMember from "./CommunityByMember";

const CommunityRouter = () => {
  return (
    <Routes>
      <Route path="list" element={<ListPost />} />
      <Route path="add" element={<AddPost />} />
      <Route path="get" element={<GetPost />} />
      <Route path="list/community" element={<CommnunityByMember />} />
      {/* <Route path="Views" element={<ListPostViews />} />
      <Route path="/category/:category" element={<CategoryId />} /> */}
    </Routes>
  );
};

export default CommunityRouter;
