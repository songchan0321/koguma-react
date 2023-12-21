import { useEffect, useState } from "react";
<<<<<<< Updated upstream
import { callReplyListAPI } from "../../apis/api/community";
import { Grid, Typography, CardContent, Card, Box } from "@mui/material";

import { useParams } from "react-router-dom";
import CommunityAavatarForm from "./CommunityAvatarFrom";
import CommentOption from "./CommentOption";
=======
import { callCommentListAPI, callReplyListAPI } from "../../apis/api/community";
import { Grid, Typography, CardContent } from "@mui/material";
import DetailOption from "./DetailOption";
import { useParams } from "react-router-dom";
>>>>>>> Stashed changes

const GetReply = () => {
  const [listReply, setListReply] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await callReplyListAPI(postId);
        console.log(data);
        setListReply(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {listReply &&
        listReply.map((Reply) => (
<<<<<<< Updated upstream
          <Box
            key={Reply.id}
            sx={{
              maxWidth: "100%",
              margin: "5px auto",
              marginLeft: "0px",
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <CommunityAavatarForm />
                  <Box sx={{ marginLeft: "auto" }}>
                    <CommentOption />
                  </Box>
                </Box>
                <CardContent sx={{ marginLeft: "30px" }}>
                  <Typography variant="body1">{Reply.content}</Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Box>
=======
          <div key={Reply.id}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="body1">{Reply.content}</Typography>
              </Grid>
            </Grid>
            <DetailOption />
          </div>
>>>>>>> Stashed changes
        ))}
    </>
  );
};
export default GetReply;
