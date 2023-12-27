import { useEffect, useState } from "react";
import { getPostAPI } from "../../apis/api/community";
import { Container, Typography, Box, Chip } from "@mui/material";
import LoadingProgress from "../../component/common/LoadingProgress";
import { useNavigate, useParams } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { authInstance } from "../../apis/utils/instance";
import PostAavatarForm from "./PostAvatarFrom";

const GetPostForm = () => {
  const { postId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPostAPI(postId);
        setData(result);
        setLoading(false);
        console.log("getIMage");
        console.log(result);

        // 조회수 증가 작업
        increaseViews(postId);
        console.log(postId);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  // increaseViews 함수 정의
  const increaseViews = async (postId) => {
    try {
      // 실제 조회수를 서버로 업데이트
      await authInstance.put(`/post/increaseViews/${postId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container fixed>
      {loading ? (
        <LoadingProgress />
      ) : (
        <>
          <Chip
            icon={<LocationCityIcon />}
            label={data.categoryName}
            sx={{
              fontSize: "0.6rem",
              height: "1.3rem",
              "& .MuiChip-label": {
                padding: "0 0.5rem",
              },
            }}
            onClick={() =>
              navigate(`/post/list/category/${data.categoryDTO?.id}`)
            }
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PostAavatarForm />
          </Box>

          <h3>
            <b>{data.title}</b>
          </h3>
          <Box sx={{ mb: "3rem" }}>
            <span>{data.content}</span>
          </Box>
          <Typography
            sx={{ display: "flex", alignItems: "center", mb: "1.3rem" }}
          >
            <RemoveRedEyeIcon
              sx={{
                marginRight: 0.5,
                fontSize: "1rem",
                verticalAlign: "middle",
              }}
            />
            <span
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "0.8rem",
              }}
            >
              {data.views + 1}명이 봤어요
            </span>
          </Typography>
          {/* <CommentCounts postId={data.id} /> */}
        </>
      )}
    </Container>
  );
};

export default GetPostForm;
