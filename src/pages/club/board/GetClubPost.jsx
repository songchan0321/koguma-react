// GetClubPost.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addComment, getClubPostAPI } from "../../../apis/api/club";
import TopBarClub from "../../../component/club/common/TopBarClub";
import MarginEmpty from "../../../component/payment/MarginEmpty";
import {
  Avatar,
  Box,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { formatTimeAgo } from "../../../apis/utils/timestamp";
import SendIcon from "@mui/icons-material/Send";
import ListClubPostComment from "../../../component/club/board/ListClubPostComment";

const GetClubPost = () => {
  const navigate = useNavigate();
  const { clubPostId } = useParams();
  const [clubPost, setClubPost] = useState({});
  const [content, setContent] = useState("");
  const [keyForRerender, setKeyForRerender] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClubPostAPI(clubPostId);
        setClubPost(data);
      } catch (error) {
        console.error("Error fetching club post:", error);
      }
    };

    fetchData();
  }, [clubPostId]);

  const handleSendMessage = async () => {
    try {
      await addComment(clubPostId, clubPost.clubId, content);
      setContent("");
      setKeyForRerender((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <>
      <div position="fixed" sx={{ textAlign: "center", mb: 1.5 }}>
        <TopBarClub>
          <div onClick={() => navigate(`/club/${clubPost.clubId}`)}>
            {clubPost.clubName}
          </div>
        </TopBarClub>
        <MarginEmpty value={70} />
      </div>

      <div style={{ marginLeft: "10px" }}>
        <Grid container spacing={{ xs: 1, md: 2 }} sx={{ padding: 0 }}>
          <Grid item xs={1.5}>
            <Avatar
              alt="Remy Sharp"
              style={{
                width: "35px",
                height: "35px",
                margin: "auto",
                borderRadius: "50%",
              }}
              src={clubPost.memberProfileURL}
            />
          </Grid>
          <Grid item xs={10} sx={{ marginLeft: "7px" }}>
            <Typography variant="body1" sx={{ fontSize: "14px" }}>
              {clubPost.clubMemberNickname}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: 1, fontSize: "12px" }}
            >
              {formatTimeAgo(clubPost.regDate)}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <MarginEmpty value={10} />

      <Paper elevation={0} style={{ marginLeft: "20px" }}>
        <Typography variant="h6">{clubPost.title}</Typography>
        <MarginEmpty value={8} />
        <div>
          <div>{clubPost.content}</div>
        </div>
      </Paper>
      <MarginEmpty value={8} />

      <div>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <CardMedia
            component="img"
            image={clubPost.images || "fallback_image_url"}
            alt="Paella dish"
          />
        </Box>
      </div>
      <MarginEmpty value={10} />

      <div style={{ marginLeft: "20px" }}>
        <Typography variant="subtitle2" color="textSecondary">
          조회 {clubPost.views}
        </Typography>
      </div>
      <MarginEmpty value={10} />

      <Divider style={{ height: 1, backgroundColor: "grey" }} />
      <div style={{ marginLeft: "20px" }}>
        <Typography variant="subtitle1" color="textSecondary">
          댓글 {clubPost.countComment}
        </Typography>
      </div>
      <Divider style={{ height: 1, backgroundColor: "grey" }} />
      <MarginEmpty value={10} />
      <div>
        <ListClubPostComment clubPostId={clubPostId} key={keyForRerender} />
      </div>

      <MarginEmpty value={70} />
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <Divider style={{ height: 0.8, backgroundColor: "black" }} />
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            height: "60px",
            backgroundColor: "white",
            borderRadius: "20px",
          }}
        >
          <Divider sx={{ height: 40, m: 0.5 }} orientation="vertical" />
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              borderRadius: "10px",
              backgroundColor: "#ECECEC",
            }}
            onChange={handleContentChange}
            placeholder="댓글을 입력해주세요."
            value={content}
            inputProps={{ "aria-label": "search google maps" }}
          />
          <Divider sx={{ height: 40, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="secondary"
            sx={{ p: "10px" }}
            aria-label="directions"
            onClick={handleSendMessage}
          >
            <SendIcon></SendIcon>
          </IconButton>
        </Paper>
      </div>
    </>
  );
};

export default GetClubPost;
