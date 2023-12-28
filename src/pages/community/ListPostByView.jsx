import { Fragment, useEffect, useState } from "react";
import PostThumbnail from "../../component/community/PostThumbnail";
import { callPostListByViewAPI } from "../../apis/api/community";
import { Divider, Fab, Paper } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Back from "../../component/common/Back";
import BottomBar from "../../component/common/BottomBar";
import LoadingProgress from "../../component/common/LoadingProgress";
import MarginEmpty from "../../component/payment/MarginEmpty";
import TopBar from "../../component/payment/TopBar";

const ListPostByViews = () => {
  const [postList, setPostList] = useState();

  useEffect(() => {
    (async () => {
      await callPostListByViewAPI()
        .then((data) => setPostList(data))
        .catch((err) => alert(err));
    })();
  }, []);
  console.log(useParams());

  return !postList ? (
    <LoadingProgress />
  ) : (
    <Fragment>
      <Paper
        sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1100 }}
        elevation={3}
      >
        <Back />
        <TopBar>인기 게시글</TopBar>
        {/* <Typography
          variant="h6"
          component="h2"
          sx={{ textAlign: "center", mb: 1.5 }}
        >
          <i>인기글</i>
        </Typography> */}
      </Paper>
      <Divider />
      <MarginEmpty />
      <PostThumbnail callAPI={callPostListByViewAPI} />

      <Fab
        style={{ position: "fixed", bottom: "80px", right: "30px" }}
        variant="contained"
        color="secondary"
        aria-label="add"
        component={Link}
        to="/post/add"
      >
        <AddIcon />
      </Fab>
      <MarginEmpty />
      <BottomBar />
    </Fragment>
  );
};
export default ListPostByViews;
