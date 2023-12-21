import React, { Fragment, useState } from "react";
<<<<<<< Updated upstream
import ListComment from "../../component/community/ListCommment";
import DetailOption from "../../component/community/DetailOption";
import GetPostForm from "../../component/community/GetPostForm";

import Back from "../../component/common/Back";

import MarginEmpty from "../../component/payment/MarginEmpty";
import { Divider, Paper } from "@mui/material";

=======
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ListComment from "../../component/community/ListCommment";
import DetailOption from "../../component/community/DetailOption";
import GetPostForm from "../../component/community/GetPostForm";
import LoadingProgress from "../../component/common/LoadingProgress";
import Back from "../../component/common/Back";
import OtherProfileForm from "../../component/member/OtherProfileForm";
import MarginEmpty from "../../component/payment/MarginEmpty";
import { Grid, TextField } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
>>>>>>> Stashed changes
import AddComment from "../../component/community/AddComment";

const GetPost = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Fragment>
<<<<<<< Updated upstream
      <Paper
        sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1100 }}
        elevation={3}
      >
        <Back />
        <DetailOption
          editTo="update"
          reportTo="/member/report/add"
          title="게시글 관리"
        />
      </Paper>
      <Divider />
      <MarginEmpty />
      <GetPostForm />
      <Divider />
      <AddComment />
      <Divider />
=======
      <Back />
      <DetailOption editTo="update" reportTo="common/" title="게시글 옵션" />
      <MarginEmpty />
      <GetPostForm />
      <AddComment />
>>>>>>> Stashed changes
      <ListComment />
    </Fragment>
  );
};

export default GetPost;
