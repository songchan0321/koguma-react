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
import CommentOption from "./CommentOption";
import CommentAavatarForm from "./CommentAvatarForm";
import { formatTimeAgo } from "../../apis/utils/timestamp";

const GetComment = () => {
  const [listComment, setListComment] = useState([]);
  const { postId } = useParams();

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
              {console.log("comment.id")}
              {console.log(comment.id)}
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
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {formatTimeAgo(comment.regDate)}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ marginLeft: "30px", marginBottom: 0 }}>
                    <Typography variant="body1">{comment.content}</Typography>
                    <ListReply commentId={comment.id} />
                    <AddReply commentId={comment.id} />
                    <Divider />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        ))}
    </>
  );
};
export default GetComment;
