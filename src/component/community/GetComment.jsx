import { useEffect, useState } from "react";
import { callCommentListAPI } from "../../apis/api/community";
import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ListReply from "./ListReply";
import AddReply from "./AddReply";
import CommentAavatarForm from "./CommentAvatarForm";
import { formatTimeAgo } from "../../apis/utils/timestamp";
import AddComment from "./AddComment";

const GetComment = () => {
  const [listComment, setListComment] = useState([]);
  const { postId } = useParams();

  const callList = () => {
    (async () => {
      try {
        const data = await callCommentListAPI(postId);
        setListComment(data);
      } catch (err) {
        console.error(err);
      }
    })();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await callCommentListAPI(postId);
        console.log("regDate");
        console.log(data.regDate);
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
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Card sx={{ maxWidth: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <CommentAavatarForm comment={comment} />

                    <Box sx={{ marginLeft: "auto" }}>
                      {/* <CommentOption /> */}
                    </Box>
                  </Box>
                  <CardContent sx={{ marginLeft: "3.5rem", marginBottom: 0 }}>
                    <Typography variant="subtitle1">
                      {comment.content}
                    </Typography>
                    <ListReply commentId={comment.id} />
                    <AddReply commentId={comment.id} />
                    {/* <Divider /> */}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <AddComment callList={callList} />
          </div>
        ))}
    </>
  );
};
export default GetComment;
