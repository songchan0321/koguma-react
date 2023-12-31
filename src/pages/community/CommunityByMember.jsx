import React, { useState } from "react";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import Back from "../../component/common/Back";
import PostThumbnail from "../../component/community/PostThumbnail";
import {
  callCommentedPostListByMemberAPI,
  callPostListByMemberAPI,
} from "../../apis/api/community";
import BottomBar from "../../component/common/BottomBar";
import MarginEmpty from "../../component/payment/MarginEmpty";

function CommnunityByMember() {
  const [myPostList, setMyPostList] = useState(false);

  const handleTabChange = (event, newValue) => {
    setMyPostList(newValue === 1); // 1이면 내가 작성한 게시글, 0이면 댓글 단 게시글
  };

  return (
    <>
      {/* 탑바 */}
      <Paper
        sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1100 }}
        elevation={3}
      >
        <Back />

        <Typography
          variant="h6"
          component="h2"
          sx={{ textAlign: "center", mb: 1.5 }}
        >
          <i>나의 동네생활</i>
        </Typography>

        <div style={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 1,
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <MarginEmpty />
            <Tabs
              value={myPostList ? 1 : 0} // 탭 구분 작성한 글 :댓글단 글
              onChange={handleTabChange} // 탭 변경
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="category tabs"
            >
              <Tab label="작성한 글" />
              <Tab label="댓글단 글" />
            </Tabs>
          </Box>
        </div>
      </Paper>
      <MarginEmpty value={"100px"} />
      <div>
        <br />

        {myPostList ? (
          <PostThumbnail callAPI={callCommentedPostListByMemberAPI} />
        ) : (
          <PostThumbnail callAPI={callPostListByMemberAPI} />
        )}
        <BottomBar />
      </div>
    </>
  );
}

export default CommnunityByMember;
