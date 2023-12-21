import React, { Fragment, useState } from "react";

import ListComment from "../../component/community/ListCommment";
import DetailOption from "../../component/community/DetailOption";
import GetPostForm from "../../component/community/GetPostForm";

import Back from "../../component/common/Back";

import MarginEmpty from "../../component/payment/MarginEmpty";
import { Divider, Paper } from "@mui/material";

import AddComment from "../../component/community/AddComment";

const GetPost = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Fragment>
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
      <ListComment />
    </Fragment>
  );
};

export default GetPost;
