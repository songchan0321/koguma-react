import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import PostForm from "../../component/community/PostForm";
import { addPostAPI } from "../../apis/api/community";

const AddPost = () => {
  return (
    <Fragment>
      <PostForm />
    </Fragment>
  );
};

export default AddPost;
