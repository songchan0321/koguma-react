import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import PostForm from "../../component/community/PostForm";
import { addPostAPI } from "../../apis/api/community";

const AddPost = () => {
  const location = useLocation();
  const [addPost, setAddPost] = useState([]);

  // useEffect(() => {
  //   async () => {
  //     await addPostAPI().then(({ result }) => {
  //       setAddPost(result);
  //     });
  //   };
  // });
  return (
    <Fragment>
      <PostForm />
    </Fragment>
  );
};

export default AddPost;
