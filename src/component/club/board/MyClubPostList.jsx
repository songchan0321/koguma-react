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
      <div>
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
            <Grid container spacing={{ xs: 1, md: 2 }}>
              <Grid item xs={1.5}>
                <CardMedia
                  component="img"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "10%",
                    marginTop: "10px",
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
                    }}
                  >
                    {clubPost.clubMemberNickname}
                  </Typography>
                </ClubContent>
              </Grid>
            </Grid>
            <Typography variant="body1" style={{}}>
              {clubPost.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {clubPost.content}
            </Typography>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <CardMedia
                component="img"
                image={clubPost.images || "fallback_image_url"}
                alt="Paella dish"
              />
            </Box>
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
