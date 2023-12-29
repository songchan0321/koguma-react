import { useEffect, useState } from "react";
import { Avatar, Box, Chip, Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
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
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Grid
                  item
                  sx={{
                    mt: "1rem",
                    ml: "1rem",
                    pb: "1.3rem",
                    position: "relative",
                  }}
                >
                  {/* 선택한 카테고리 */}
                  <Box variant="body3" color="text.secondary">
                    <Chip
                      sx={{
                        fontSize: "0.6rem",
                        height: "1.3rem",
                        "& .MuiChip-label": {
                          padding: "0 0.5rem",
                        },
                      }}
                      label={post.categoryName}
                    />
                  </Box>
                  {/* 게시글 제목 */}
                  <Typography noWrap sx={{ fontSize: "1rem" }}>
                    {post.title.length > 30
                      ? `${post.title.slice(0, 30)}···`
                      : post.title}
                  </Typography>

                  {/* 게시글 내용 (20자만 표시) */}
                  <Typography
                    // variant="body2"
                    color="text.secondary"
                    noWrap
                    sx={{ fontSize: "0.9rem", mt: "0.2rem" }}
                  >
                    {post.content.length > 20
                      ? `${post.content.slice(0, 20)}···`
                      : post.content}
                  </Typography>

                  {/* 대표 동 + 조회수*/}
                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: "0.7rem", mt: "0.2rem" }}
                  >
                    {post.dong} · 조회 {post.views} ·{" "}
                    {formatTimeAgo(post.regDate)}
                  </Typography>
                  <div
                    style={{ position: "absolute", bottom: "3rem", right: 10 }}
                  >
                    {post.imageDTO && post.imageDTO.length > 0 && (
                      <>
                        <Avatar
                          alt="/photo.png"
                          src={
                            post.imageDTO && post.imageDTO.length > 0
                              ? post.imageDTO[0].url
                              : "/photo.png"
                          }
                          variant="square"
                          sx={{
                            width: 65,
                            height: 65,
                            // mr: 1,
                            border: "solid 1px rgba(120, 120, 120, 0.2)",
                          }}
                        />
                      </>
                    )}
                  </div>
                  <div
                    style={{ position: "absolute", bottom: "1.1rem", right: 0 }}
                  >
                    <CommentCounts postId={post.id} />
                  </div>
                </Grid>
                <Divider variant="middle" sx={{ borderBottomWidth: 2 }} />
              </Link>
            </div>
          ))}
    </>
  );
};

export default PostThumbnail;
