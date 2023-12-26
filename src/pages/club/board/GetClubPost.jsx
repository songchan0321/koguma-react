import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClubPostAPI } from "../../../apis/api/club";
import TopBar from "../../../component/payment/TopBar";
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

const GetClubPost = () => {
  const navigate = useNavigate();
  const { clubPostId } = useParams();
  const [clubPost, setClubPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getClubPostAPI(clubPostId);
      setClubPost(data);
      try {
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubPostId]);
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
        {" "}
        <Grid container spacing={{ xs: 1, md: 2 }} sx={{ padding: 0 }}>
          <Grid item xs={1.5}>
            <Avatar
              alt="Remy Sharp"
              style={{
                width: "35px", // Avatar의 너비 조절
                height: "35px", // Avatar의 높이 조절
                margin: "auto",
                borderRadius: "50%", // 반원 형태로 만들기 위해 borderRadius 조절
              }}
              src={clubPost.memberProfileURL}
            />
          </Grid>
          <Grid item xs={10} sx={{ marginLeft: "7px" }}>
            <Typography variant="body1" sx={{ fontSize: "14px" }}>
              {" "}
              {/* 폰트 크기 조절 */}
              {clubPost.clubMemberNickname}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: 1, fontSize: "12px" }} // 폰트 크기 조절
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
      {/* <div style={{ marginLeft: "20px", marginRight: "20px" }}> */}
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
          댓글
        </Typography>
      </div>
      <Divider style={{ height: 1, backgroundColor: "grey" }} />
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <Divider style={{ height: 0.8, backgroundColor: "black" }} />
        {/* 메시지 입력 창 영역 */}
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            height: "60px",
            backgroundColor: "white",
            borderRadius: "20px", // 둥근 테두리 설정
          }}
        >
          <Divider sx={{ height: 40, m: 0.5 }} orientation="vertical" />
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              borderRadius: "10px", // 둥근 테두리 설정

              backgroundColor: "#ECECEC", // 연한 회색 색상
            }}
            placeholder="  댓글을 입력해주세요."
            // value={inputMessage}
            // onChange={(e) => setInputMessage(e.target.value)}

            inputProps={{ "aria-label": "search google maps" }}
          />
          <Divider sx={{ height: 40, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="secondary"
            sx={{ p: "10px" }}
            aria-label="directions"
            // onClick={handleSendMessage}
          >
            <SendIcon></SendIcon>
          </IconButton>
        </Paper>
      </div>
    </>
  );
};

export default GetClubPost;
