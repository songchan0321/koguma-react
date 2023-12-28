import React from "react";
import { Route, Routes } from "react-router-dom";
import ListPost from "./ListPost";
import AddPost from "./AddPost";
import GetPost from "./GetPost";
import CommunityByMember from "./CommunityByMember";
import UpdatePost from "./UpdatePost";
import ListPostByCategory from "./ListPostByCategory";
import ListPostByView from "./ListPostByView";
import DetailOption from "../../component/community/DetailOption";

const CommunityRouter = () => {
  return (
    <Routes>
      <Route path="list" element={<ListPost />} />
      <Route path="add" element={<AddPost />} />
      <Route path=":postId" element={<GetPost />} />
      <Route path=":postId/update" element={<UpdatePost />} />
      <Route path=":postId/delete" element={<DetailOption />} />

      <Route path="list/community" element={<CommunityByMember />} />

      <Route path="list/category/View" element={<ListPostByView />} />
      <Route
        path="list/category/:categoryId"
        element={<ListPostByCategory />}
      />
      {/* <Route path="comment/get/:commentId" element={<CommentAavatarForm />} /> */}
    </Routes>
  );
};

export default CommunityRouter;
