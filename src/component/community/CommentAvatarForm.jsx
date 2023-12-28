import * as React from "react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardHeader, Avatar, Box, Stack, Typography } from "@mui/material";
import { getCommentAPI } from "../../apis/api/community";
import { formatTimeAgo } from "../../apis/utils/timestamp";

const CommentAavatarForm = ({ comment }) => {
  const [data, setData] = useState(null);
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

    if (!data || data?.comment?.id !== comment.id) {
      fetchData();
    }
  }, [comment]);
  console.log("data");
  console.log(data);
  return (
    <>
      {data && (
        // <Box>
        <Stack direction={"row"} sx={{ ml: "1rem", mt: "1rem" }}>
          <Avatar
            style={{ width: "2.5rem", height: "2.5rem" }}
            onClick={() => getMember(data.memberDTO?.id)}
            src={data.memberDTO.profileURL}
          />
          <Stack>
            <Typography sx={{ ml: "1rem" }}>
              {data.memberDTO?.nickname}
            </Typography>
            <Typography color="gray" sx={{ fontSize: "0.8rem", ml: "1rem" }}>
              {data.postDTO?.dong + " · " + formatTimeAgo(comment.regDate)}
            </Typography>
          </Stack>
        </Stack>
        // <CardHeader
        //   sx={{ maxWidth: "100%", pb: 0 }}
        //   avatar={
        //     <Avatar
        //       aria-label="recipe"
        //       style={{ width: "2.5rem", height: "2.5rem" }}
        //     >
        //       <img
        //         src={data.memberDTO.profileURL}
        //         alt="profile"
        //         style={{
        //           width: "100%",
        //           height: "100%",
        //           borderRadius: "50%",
        //         }}
        //       />
        //     </Avatar>
        //   }
        //   onClick={() => getMember(data.memberDTO?.id)}
        //   title={data.memberDTO?.nickname}
        //   subheader={
        //     data.postDTO?.dong + " · " + formatTimeAgo(comment.regDate)
        //   }
        // />
        // </Box>
      )}
    </>
  );
};
export default CommentAavatarForm;
