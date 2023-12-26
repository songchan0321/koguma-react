import React, { useEffect, useState } from "react";
import { addComment, listComment } from "../../../apis/api/club";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { formatTimeAgo } from "../../../apis/utils/timestamp";
import MarginEmpty from "../../payment/MarginEmpty";

const ListClubPostComment = ({ clubPostId }) => {
  const [commets, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listComment(clubPostId);
        setComments(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubPostId]);

  return (
    <div>
      {commets &&
        commets.map((comment, index) => (
          <div key={index}>
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
                    src={comment.memberProfile}
                  />
                </Grid>
                <Grid item xs={10} sx={{ marginLeft: "7px" }}>
                  <Typography variant="body1" sx={{ fontSize: "14px" }}>
                    {" "}
                    {/* 폰트 크기 조절 */}
                    {comment.clubMemberNickname}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ mb: 1, fontSize: "12px" }} // 폰트 크기 조절
                  >
                    {formatTimeAgo(comment.regDate)}
                  </Typography>
                  <div>
                    <Typography variant="subtitle2">
                      {comment.content}{" "}
                    </Typography>
                  </div>
                  <MarginEmpty value={8} />
                </Grid>
              </Grid>
            </div>{" "}
          </div>
        ))}
    </div>
  );
};

export default ListClubPostComment;
