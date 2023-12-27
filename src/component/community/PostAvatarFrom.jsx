import * as React from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardHeader, Avatar } from "@mui/material";
import { getPostAPI } from "../../apis/api/community";

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
          sx={{ maxWidth: "100%" }}
          avatar={
            <Avatar
              aria-label="recipe"
              style={{ width: "48px", height: "48px" }} // Avatar 크기 조정
            >
              <img
                src={data.memberDTO.profileURL}
                alt="profile"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                }} // 이미지 크기 및 모양 조정
              />
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
export default PostAavatarForm;
