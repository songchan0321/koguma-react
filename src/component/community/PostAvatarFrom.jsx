import * as React from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardHeader, Avatar } from "@mui/material";
import { getPostAPI } from "../../apis/api/community";
import { formatTimeAgo } from "../../apis/utils/timestamp";

const PostAavatarForm = () => {
  const { postId } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getMember = (memberId) => {
    navigate(`/member/other/get/${memberId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPostAPI(postId);
        setData(result);
        setLoading(false);
        console.log(result);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {data && (
        <CardHeader
          sx={{ pt: "1rem", pl: 0 }}
          avatar={
            <Avatar
              aria-label="recipe"
              style={{ width: "2.3rem", height: "2.3rem" }} // Avatar 크기 조정
              src={data.memberDTO.profileURL}
            />
          }
          onClick={() => getMember(data.memberDTO?.id)}
          title={data.memberDTO?.nickname}
          subheader={data.dong + " · " + formatTimeAgo(data.regDate)}
        />
      )}
    </>
  );
};
export default PostAavatarForm;
