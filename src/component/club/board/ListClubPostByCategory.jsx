import { useEffect, useState } from "react";
import { listClubPostByCategory } from "../../../apis/api/club";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import MarginEmpty from "../../payment/MarginEmpty";
import { formatTimeAgo } from "../../../apis/utils/timestamp";

const ListClubPostByCategory = ({ category }) => {
  const navigate = useNavigate();
  const [clubPosts, setClubPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listClubPostByCategory(category.id);
        console.log(data);
        const reponse = await listClubPostByCategory(category.id);
        setClubPosts(reponse);
        console.log(reponse);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);

  return (
    <>
      <div></div>

      {clubPosts &&
        clubPosts.map((clubPost, index) => (
          <>
            <div
              onClick={() =>
                navigate(`/club/post/${clubPost.id}`, {
                  clubId: clubPost.clubId,
                })
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
            <Divider style={{ height: 1, backgroundColor: "grey" }} />{" "}
          </>
        ))}
    </>
  );
};

export default ListClubPostByCategory;
const ClubContent = styled(CardContent)({
  flex: 1,
  width: "200",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
