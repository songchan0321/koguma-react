import React from "react";
import AddPostTopBar from "../../component/community/AddPostTopBar";
import { Fragment } from "react";
import BottomBar from "../../component/common/BottomBar";
import { useLocation } from "react-router-dom";

const AddPost = () => {
  const location = useLocation();

  return (
    <Fragment>
      <AddPostTopBar />

      {/* addPost에만 하단바 제거하고 싶은데 안됨 */}
      {location.pathname.toLowerCase() !== "/add-post" && <BottomBar />}
    </Fragment>
  );
};

export default AddPost;
