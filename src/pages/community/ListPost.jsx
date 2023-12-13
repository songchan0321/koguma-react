import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import PostTopBar from "../../component/community/PostTopBar";
import BottomBar from "../../component/common/BottomBar";
import { authInstance } from "../../apis/utils/instance";

const ListPost = () => {
  const [callPostList, setListPost] = useState([]);

  //axios를 통해 게시판 목록을 조회하는 함수
  const getListPost = async () => {
    const resp = (await authInstance.get("//localhost:8080/post/list")).data;
    setListPost(resp.data);
    console.log(resp.data);
  };

  useEffect(() => {
    getListPost();
  }, []);

  return (
    <Fragment>
      <div>
        <PostTopBar />
      </div>

      <div style={{ position: "absolute", bottom: "80px", right: "30px" }}>
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
      <BottomBar />
    </Fragment>
  );
};

export default ListPost;
