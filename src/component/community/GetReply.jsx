import { useEffect, useState } from "react";
import { callReplyListAPI } from "../../apis/api/community";
import { Grid, Typography, CardContent, Box } from "@mui/material";
import CommentAavatarForm from "./CommentAvatarForm";
import { formatTimeAgo } from "../../apis/utils/timestamp";

const GetReply = ({ commentId }) => {
  const [listReply, setListReply] = useState([]);
  console.log("commentId");
  console.log(commentId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await callReplyListAPI(commentId);
        console.log(commentId);
        setListReply(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [commentId]);

  return (
    <>
      {listReply &&
        listReply.map((Reply) => (
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
                  <CommentAavatarForm comment={Reply} />
                  <Box sx={{ marginLeft: "auto" }}>
                    {/* <CommentOption /> */}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {formatTimeAgo(Reply.regDate)}
                    </Typography>
                  </Box>
                  {/* <Box sx={{ marginLeft: "auto" }}>
                    <CommentOption />
                  </Box> */}
                </Box>
                <CardContent sx={{ marginLeft: "30px" }}>
                  <Typography variant="body1">{Reply.content}</Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Box>
        ))}
    </>
  );
};
export default GetReply;
