import { useEffect, useState } from "react";
import { getPostAPI } from "../../apis/api/community";
import { Container, Button, Typography, Box } from "@mui/material";
import LoadingProgress from "../../component/common/LoadingProgress";
import { useNavigate, useParams } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { authInstance } from "../../apis/utils/instance";
import PostAavatarForm from "./PostAvatarFrom";
import CommentCounts from "./CommentCounts";
import { formatTimeAgo } from "../../apis/utils/timestamp";

const GetPostForm = () => {
  const { postId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getMember = (memberId) => {
    navigate(`/member/other/get/${memberId}`);
  };

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
          <Button
            variant="outlined"
            sx={{
              padding: "5px 10px",
              fontSize: "0.8rem",
              color: "secondary.main",
              borderColor: "secondary.main",
            }}
            onClick={() =>
              navigate(`/post/list/category/${data.categoryDTO?.id}`)
            }
          >
            <LocationCityIcon /> {data.categoryName}
          </Button>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PostAavatarForm />
            <Box sx={{ marginLeft: "auto" }}>
              {/* <CommentOption /> */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 1, fontSize: "1.0rem" }}
              >
                {formatTimeAgo(data.regDate)}
              </Typography>
            </Box>
          </Box>

          <h1>{data.title}</h1>
          <Box sx={{ mb: 10, overflowY: "auto" }}>
            <h3>{data.content}</h3>
          </Box>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
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
          <CommentCounts postId={data.id} />
        </>
      )}
    </Container>
  );
};

export default GetPostForm;
