import * as React from "react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardHeader, Avatar, Typography, Box, Card } from "@mui/material";
import { getCommentAPI } from "../../apis/api/community";
import { formatTimeAgo } from "../../apis/utils/timestamp";

const CommentAavatarForm = ({ comment }) => {
  const [data, setData] = useState(null);
  const [isMine, setIsMine] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getMember = (memberId) => {
    navigate(`/member/other/get/${memberId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCommentAPI(comment.id);
        setData(result);
        setLoading(false);
        console.log("GetComment");
        console.log(comment);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (!data || data.comment.id !== comment.id) {
      fetchData();
    }
  }, [comment]);
  console.log("data");
  console.log(data);
  return (
    <>
      {data && (
        <Box>
          <CardHeader
            sx={{ maxWidth: "100%" }}
            avatar={
              <Avatar
                aria-label="recipe"
                style={{ width: "48px", height: "48px" }}
              >
                <img
                  src={data.memberDTO.profileURL}
                  alt="profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                  }}
                />
              </Avatar>
            }
            onClick={() => getMember(data.memberDTO?.id)}
            title={data.memberDTO?.nickname}
            subheader={data.postDTO?.dong}
          />
          
        </Box>
      )}
    </>
  );
};
export default CommentAavatarForm;
