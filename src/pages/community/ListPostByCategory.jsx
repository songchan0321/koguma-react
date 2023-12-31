import { Fragment, useEffect, useState } from "react";
import PostThumbnail from "../../component/community/PostThumbnail";
import { callPostListByCategoryAPI } from "../../apis/api/community";
import { Divider, Fab, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Back from "../../component/common/Back";
import BottomBar from "../../component/common/BottomBar";
import LoadingProgress from "../../component/common/LoadingProgress";
import MarginEmpty from "../../component/payment/MarginEmpty";
import TopBar from "../../component/payment/TopBar";

const ListPostByCategory = () => {
  const categories = [
    { id: "views", name: "인기글" },
    { id: 23, name: "동네소식" },
    { id: 24, name: "동네맛집" },
    { id: 25, name: "동네질문" },
    { id: 26, name: "취미생활" },
    { id: 27, name: "일상" },
    { id: 28, name: "분실/실종" },
  ];
  const { categoryId } = useParams();
  const [postList, setPostList] = useState();
  const [title, setTitle] = useState();
  useEffect(() => {
    (async () => {
      await callPostListByCategoryAPI(categoryId)
        .then((data) => setPostList(data), console.log(postList))
        .catch((err) => alert(err));
    })();
  }, [categoryId]);
  console.log(useParams());
  console.log(categoryId);
  console.log();

  const getCategoryNameById = (id) => {
    const foundCategory = categories.find((category) => category.id === id);
    return foundCategory ? foundCategory.name : "Unknown";
  };
  console.log(getCategoryNameById);

  return !postList ? (
    <LoadingProgress />
  ) : (
    <Fragment>
      <Back />
      <MarginEmpty />
      <Typography>
        <i>{title}</i>
      </Typography>
      <Divider />
      <TopBar>
        {/* {alert(categories[categoryId])} */}
        {categories.filter((cat) => cat.id === parseInt(categoryId))[0][
          "name"
        ] + " 게시글"}
      </TopBar>
      <PostThumbnail
        callAPI={callPostListByCategoryAPI}
        callParam={categoryId}
      ></PostThumbnail>
      <Fab
        style={{
          position: "fixed",
          bottom: "80px",
          right: "30px",
          backgroundColor: "#D070FB",
        }}
        variant="contained"
        // color="secondary"
        aria-label="add"
        component={Link}
        to="/post/add"
      >
        <AddIcon sx={{ color: "white" }} />
      </Fab>

      <MarginEmpty />
      <BottomBar />
    </Fragment>
  );
};
export default ListPostByCategory;
