import React from "react";
import { Route, Routes } from "react-router-dom";
import ListPost from "./ListPost";
import AddPost from "./AddPost";
import GetPost from "./GetPost";
import CommunityByMember from "./CommunityByMember";
import UpdatePost from "./UpdatePost";
import ListPostByCategory from "./ListPostByCategory";
<<<<<<< Updated upstream
import ListPostByView from "./ListPostByView";
=======
>>>>>>> Stashed changes

const CommunityRouter = () => {
  return (
    <Routes>
      <Route path="list" element={<ListPost />} />
      <Route path="add" element={<AddPost />} />
      <Route path=":postId" element={<GetPost />} />
      <Route path=":postId/update" element={<UpdatePost />} />
      {/* <Route path=":postId/delete" element={<DeletePost />} /> */}

      <Route path="list/community" element={<CommunityByMember />} />

<<<<<<< Updated upstream
      <Route path="list/category/View" element={<ListPostByView />} />
      <Route
        path="list/category/:categoryId"
        element={<ListPostByCategory />}
      />
=======
      {/* <Route path="Views" element={<ListPostViews />} /> */}
      <Route path="list/category/:category" element={<ListPostByCategory />} />
>>>>>>> Stashed changes
    </Routes>
  );
};

export default CommunityRouter;
