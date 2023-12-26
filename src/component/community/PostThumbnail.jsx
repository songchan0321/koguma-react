import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CommentCounts from "./CommentCounts";
import { formatTimeAgo } from "../../apis/utils/timestamp";

const PostThumbnail = ({ callAPI, callParam }) => {
  const [listPost, setListPost] = useState([]);
  console.log(callParam);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await callAPI(callParam);
        console.log(data);

        setListPost(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [callAPI]);

  return (
    <>
      {listPost &&
        listPost
          .filter((post) => post.activeFlag)
          .map((post) => (
            <div key={post.id}>
              <Link
                to={`/post/${post.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <PostContent>
                      {/* 선택한 카테고리 */}
                      <Box variant="body3" color="text.secondary">
                        {post.categoryName}
                      </Box>
                      {/* 게시글 제목 */}
                      <Typography
                        variant="body1"
                        noWrap
                        sx={{ fontSize: "20px" }}
                      >
                        {post.title.length > 30
                          ? `${post.title.slice(0, 30)}···`
                          : post.title}
                      </Typography>

                      {/* 게시글 내용 (20자만 표시) */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{ fontSize: "18px" }}
                      >
                        {post.content.length > 20
                          ? `${post.content.slice(0, 20)}···`
                          : post.content}
                      </Typography>

                      {/* 대표 동 + 조회수*/}
                      <Typography variant="body2" color="text.secondary">
                        {post.dong} · 조회 {post.views} ·{" "}
                        {formatTimeAgo(post.regDate)}
                      </Typography>
                    </PostContent>
                  </Grid>

                  <Grid
                    item
                    xs={4}
                    style={{ position: "relative", textAlign: "right" }}
                  >
                    <CommentCounts postId={post.id} />
                  </Grid>
                </Grid>

                <Divider />
              </Link>
            </div>
          ))}
    </>
  );
};

export default PostThumbnail;

const PostCard = styled(Card)({
  display: "flex",
  flexDirection: "row",
});

const PostContent = styled(CardContent)({
  flex: 1,
  width: "200",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
