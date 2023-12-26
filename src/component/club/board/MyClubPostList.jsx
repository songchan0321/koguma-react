import {
  Typography,
  Grid,
  CardMedia,
  Card,
  CardContent,
  Divider,
  Checkbox,
  Box,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useEffect, useState } from "react";
import { listMyClubPostAPI } from "../../../apis/api/club";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MarginEmpty from "../../payment/MarginEmpty";
import { formatTimeAgo } from "../../../apis/utils/timestamp";

const MyClubPostList = () => {
  const navigate = useNavigate();
  const [clubPosts, setClubPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listMyClubPostAPI();
        console.log(data);
        setClubPost(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  };

  return (
    <>
      <div style={{ margin: "10px" }}>
        <Typography variant="h5">피드</Typography>
      </div>

      {clubPosts.map((clubPost, index) => (
        <>
          <div
            onClick={() =>
              navigate(`/club/post/${clubPost.id}`, { clubId: clubPost.clubId })
            }
            key={index}
          >
            <div style={{ margin: "10px" }}>
              <Grid container spacing={{ xs: 1, md: 2 }} sx={{ padding: 0 }}>
                <Grid item xs={1.5} sx={{ padding: 0 }}>
                  <CardMedia
                    component="img"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "10%",
                      marginTop: "15px",
                    }}
                    image={clubPost.profileImage[0].url}
                    alt={clubPost.title}
                  />
                </Grid>
                <Grid item xs={10}>
                  <ClubContent>
                    {/* 모임 타이틀 */}
                    <Typography
                      variant="body1"
                      style={{
                        width: "80px",
                        fontSize: "15px",
                      }}
                    >
                      {clubPost.clubName}
                    </Typography>
                    {/* 작성 모임원 닉네임 */}

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{
                        width: "100px",
                        fontSize: "12px",
                      }}
                    >
                      {clubPost.clubMemberNickname}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{ mb: -3 }}
                      style={{ fontSize: "10px" }}
                    >
                      {formatTimeAgo(clubPost.regDate)}
                    </Typography>
                  </ClubContent>
                </Grid>
              </Grid>
            </div>
            <div style={{ margin: "10px" }}>
              <Typography variant="body1" style={{}}>
                {clubPost.title}
              </Typography>
              <div>{clubPost.content}</div>
              <MarginEmpty value={8} />
              <Box style={{ display: "flex", alignItems: "center" }}>
                <CardMedia
                  component="img"
                  image={clubPost.images || "fallback_image_url"}
                  alt="Paella dish"
                />
              </Box>
            </div>
            {/* 
            <Checkbox
              icon={<ThumbUpOffAltIcon />}
              checkedIcon={<ThumbUpAltIcon color="secondary" />}
            />
            <ChatBubbleOutlineIcon color="text.secondary" /> */}
          </div>
          <MarginEmpty value={10} />
          <Divider style={{ height: 1, backgroundColor: "grey" }} />
        </>
      ))}
    </>
  );
};

export default MyClubPostList;
const backgroundStyle = {
  boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.1)",
  padding: "0.2px",
};

const ClubCard = styled(Card)({
  display: "flex",
  flexDirection: "row",
});

const ClubContent = styled(CardContent)({
  flex: 1,
  width: "200",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
