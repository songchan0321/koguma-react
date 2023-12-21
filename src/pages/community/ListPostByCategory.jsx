<<<<<<< Updated upstream
import { Fragment, useEffect, useState } from "react";
import PostThumbnail from "../../component/community/PostThumbnail";
import { callPostListByCategoryAPI } from "../../apis/api/community";
import { Divider, Fab, List, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Back from "../../component/common/Back";
import BottomBar from "../../component/common/BottomBar";
import LoadingProgress from "../../component/common/LoadingProgress";
import MarginEmpty from "../../component/payment/MarginEmpty";

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
      <PostThumbnail
        callAPI={callPostListByCategoryAPI}
        callParam={categoryId}
=======
import { Fragment } from "react";
import PostThumbnail from "../../component/community/PostThumbnail";
import { callPostListByCategoryAPI } from "../../apis/api/community";
import { Fab } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Back from "../../component/common/Back";

const ListPostByCategory = (selectedCategory) => {
  //   const { selectedCategory } = useParams();
  console.log(selectedCategory);
  //   JSON.stringify(selectedCategory);
  return (
    <Fragment>
      <Back />
      <PostThumbnail
        callAPI={callPostListByCategoryAPI}
        callParam={selectedCategory}
>>>>>>> Stashed changes
      />

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
<<<<<<< Updated upstream
      <MarginEmpty />
      <BottomBar />
=======
>>>>>>> Stashed changes
    </Fragment>
  );
};
export default ListPostByCategory;
