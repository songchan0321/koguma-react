import { useEffect, useState } from "react";
import { callCommentListAPI } from "../../apis/api/community";
<<<<<<< Updated upstream
import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
} from "@mui/material";
=======
import { Grid, Typography, CardContent } from "@mui/material";
>>>>>>> Stashed changes
import DetailOption from "./DetailOption";
import { useParams } from "react-router-dom";
import ListReply from "./ListReply";
import MarginEmpty from "../payment/MarginEmpty";
<<<<<<< Updated upstream
import CommunityAavatarForm from "./CommunityAvatarFrom";
import AddReply from "./AddReply";
import CommentOption from "./CommentOption";
=======
>>>>>>> Stashed changes

const GetComment = () => {
  const [listComment, setListComment] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await callCommentListAPI(postId);
        console.log(data);
        setListComment(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {listComment &&
        listComment.map((comment) => (
          <div key={comment.id}>
<<<<<<< Updated upstream
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Card sx={{ maxWidth: "90%" }}>
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
                  <CardContent sx={{ marginLeft: "30px", marginBottom: 0 }}>
                    <Typography variant="header4">{comment.content}</Typography>

                    <ListReply />
                    <AddReply />
                    <Divider />
                  </CardContent>
                </Card>
              </Grid>
=======
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">{comment.content}</Typography>
                <DetailOption />
                <MarginEmpty />
              </Grid>
              <div>
                <ListReply />
              </div>
>>>>>>> Stashed changes
            </Grid>
          </div>
        ))}
    </>
  );
};
export default GetComment;
