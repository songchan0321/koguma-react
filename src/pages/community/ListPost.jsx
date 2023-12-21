import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import PostTopBar from "../../component/community/PostTopBar";
import BottomBar from "../../component/common/BottomBar";
import { authInstance } from "../../apis/utils/instance";
import PostThumbnail from "../../component/community/PostThumbnail";
import { callPostListAPI } from "../../apis/api/community";
import MarginEmpty from "../../component/payment/MarginEmpty";

const ListPost = () => {
  return (
    <Fragment>
      <PostTopBar />
      <MarginEmpty />
      <PostThumbnail callAPI={callPostListAPI} />

      <div style={{ position: "fixed", bottom: "80px", right: "30px" }}>
        <Fab
          variant="contained"
          color="secondary"
          aria-label="add"
          component={Link}
          to="/post/add"
        >
          <AddIcon />
        </Fab>
      </div>
      <MarginEmpty />
      <BottomBar />
    </Fragment>
  );
};

export default ListPost;
