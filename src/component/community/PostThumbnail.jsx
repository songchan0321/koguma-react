import { useEffect, useState } from "react";

import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";


import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { callPostListAPI } from "../../apis/api/community";

import { Link } from "react-router-dom";
import styled from "styled-components";

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
        listPost.map((post) => (
          <div key={post.id}>
            <Link
              to={`/post/${post.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <PostContent>
<<<<<<< Updated upstreamq
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                    {/* 선택한 카테고리 */}
                    <Typography variant="body1" color="text.secondary">
                      {post.categoryName}
                    </Typography>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
=======
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
                    {/* 게시글 제목 */}
                    <Typography variant="body1">
                      {post.title.slice(0, 20)}
                    </Typography>
                    {/* 게시글 내용 (20자만 표시) */}
                    <Typography variant="body2" color="text.secondary">
                      {post.content.slice(0, 20)}
                    </Typography>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes

=======
                    {/* 선택한 카테고리 */}
                    <Typography variant="body2" color="text.secondary">
                      {post.categoryName}
                    </Typography>
>>>>>>> Stashed changes
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                    {/* 대표 동 */}
                    <Typography variant="body2" color="text.secondary">
                      {post.dong}
                    </Typography>
<<<<<<< Updated upstream
                    {/* 타임스탬프 추가 */}
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                    {/* 타임스탬프 추가 */}
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
                  </PostContent>
                </Grid>
                <Grid item xs={4}>
                  {/* 이미지 추가시 */}
                  {/* <CardMedia
                    component="img"
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "auto",
                      borderRadius: "50%",
                    }}
                    image="data:image/jpeg;base64,..."
                    alt={post.title}
                  /> */}
                </Grid>
              </Grid>
<<<<<<< Updated upstream
              <Divider />
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              <Divider />
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
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
