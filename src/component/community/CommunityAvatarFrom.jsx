import * as React from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardHeader, Avatar } from "@mui/material";
import { getPostAPI } from "../../apis/api/community";

const CommunityAavatarForm = () => {
  const { postId } = useParams();
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
          sx={{ maxWidth: "100%" }}
          avatar={
            <Avatar sx={{ bgcolor: "ThreeDShadow" }} aria-label="recipe">
              R
            </Avatar>
          }
          onClick={() => getMember(data.memberDTO?.id)}
          title={data.memberDTO?.nickname}
          subheader={data.dong}
        />
      )}
    </>
  );
};
export default CommunityAavatarForm;
