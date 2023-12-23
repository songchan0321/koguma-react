import { useEffect, useState, useContext } from "react";
import { IsLoginContext } from "../../context/LoginContextProvider";
import { getPostAPI } from "../../apis/api/community";
import { Container, Button, Typography, Box } from "@mui/material";
import LoadingProgress from "../../component/common/LoadingProgress";
import { useNavigate, useParams } from "react-router-dom";
import CommunityAavatarForm from "./CommunityAvatarFrom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { authInstance } from "../../apis/utils/instance";

const GetPostForm = () => {
  const { setIsLogin } = useContext(IsLoginContext);
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
          <CommunityAavatarForm />
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
        </>
      )}
    </Container>
  );
};

export default GetPostForm;
