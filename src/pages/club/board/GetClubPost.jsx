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
  Paper,
  Typography,
} from "@mui/material";
import { formatTimeAgo } from "../../../apis/utils/timestamp";

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
      <div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Avatar
              alt="Remy Sharp"
              style={{
                width: "45px",
                height: "45px",
                margin: "auto",
                borderRadius: "100%",
              }}
              src={clubPost.memberProfileURL}
            />
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1">
              {clubPost.clubMemberNickname}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: 1 }}
            >
              {formatTimeAgo(clubPost.regDate)}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <MarginEmpty value={10} />
      <Paper elevation={0} style={{ marginLeft: "20px" }}>
        <Typography variant="h5">{clubPost.title}</Typography>
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
    </>
  );
};

export default GetClubPost;
