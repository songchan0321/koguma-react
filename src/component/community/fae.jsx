import React, { useState } from "react";
import CategoryList from "../../component/club/CategoryList";
import ClubListByCategory from "../../component/club/ClubListByCategory";
import { Box, Divider, Paper, Tab, Tabs, Typography } from "@mui/material";

import { useParams } from "react-router-dom";

import MyClubList from "../../component/club/MyClubList";

import MyClubPostList from "../../component/club/board/MyClubPostList";
import Back from "../common/Back";
import PostThumbnail from "./PostThumbnail";
import { callPostListByMemberAPI } from "../../apis/api/community";
import BottomBar from "../common/BottomBar";

function CommnunityByMember() {
  const { memberId } = useParams();
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
      </Paper>
      {/* 게시글/댓글 구분 탭  */}
      <div>
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
        <br />
        {/* 댓글단 게시글  */}
        {myPostList ? (
          <div style={{ margin: "10px" }}>
            <MyClubList />
            <Divider />
            <div style={{ margin: "10px" }}>
              <MyClubPostList />
            </div>
          </div>
        ) : (
          //현재 접속 맴버 아이디로 댓글을 뽑고 거기서 postId만 넘겨 출력?
          // 내가 작성한 게시글
          <PostThumbnail
            callAPI={callPostListByMemberAPI}
            callParam={memberId}
          />
        )}
        <BottomBar />
      </div>
    </>
  );
}

export default CommnunityByMember;
