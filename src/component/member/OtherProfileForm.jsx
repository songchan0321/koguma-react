import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authInstance } from "../../apis/utils/instance";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { linearProgressClasses } from "@mui/joy";
import { styled } from "@mui/system";
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'; //30~39
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'; //40~59
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'; //20~29
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'; // 60~

const OtherProfileForm = ({score}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [otherMember, setOtherMember] = useState({});
  const [loading, setLoading] = useState(true);
  const BorderLinearProgress = styled(LinearProgress)(({ theme, score }) => ({
    height: 5,
    borderRadius: 5,
    backgroundColor: "lightgrey",
  }));
  let textColor;

  // Score에 따라 적절한 색상 설정
  if (otherMember.score <= 36.0) {
    textColor = "info"; // 파란색
  } else if (otherMember.score > 36.0 && otherMember.score <= 42.0) {
    textColor = "success"; // 초록색
  } else if (otherMember.score > 42.0 && otherMember.score <= 50.0) {
    textColor = "warning"; // 노란색
  } else {
    textColor = "error"; // 빨간색
  }

  useEffect(() => {
    const fetchOtherMember = async () => {
      try {
        const response = await authInstance.get(`/member/other/get/${id}`,{
          headers: {
            Accept: "application/json",
          },
        });
        setOtherMember(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching other member data:", error);
        setLoading(false);
      }
    };

    fetchOtherMember();
  }, [id]);

  const handleBlockButtonClick = () => {
    // Navigate to "/member/relationship/block/add/:targetMemberId"
    navigate(`/member/relationship/block/add`, { state: { id: id } });
  };

  const handleFollowingButtonClick = () => {
    // Navigate to "/member/relationship/following/add/:targetMemberId"
    navigate(`/member/relationship/following/add`, { state: { id: id } });
  };
  const getOtherMemberProduct = () => {
    navigate(`/product/get/other/product/${id}`, { state: { memberId: id } });
  };
  const getEmoticonByScore = (score) => {
    if (score >= 60) {
      return <InsertEmoticonIcon sx={{ fontSize: 18, color: '#000000', marginLeft: '5px', marginBottom: '3px' }} />;
    } else if (score >= 40) {
      return <SentimentSatisfiedAltIcon sx={{ fontSize: 18, color: '#000000', marginLeft: '5px', marginBottom: '3px' }} />;
    } else if (score >= 30) {
      return <SentimentSatisfiedIcon sx={{ fontSize: 18, color: '#000000', marginLeft: '5px', marginBottom: '3px' }} />;
    } else {
      return <SentimentDissatisfiedIcon sx={{ fontSize: 18, color: '#000000', marginLeft: '5px', marginBottom: '3px' }} />;
    }
  };

  return (
      <div>
        {loading ? (
            <CircularProgress />
        ) : (
            <div>
              <Typography
                  variant="body1"
                  sx={{
                    color: "#673AB7",
                    display: "flex",
                    justifyContent: "center",
                  }}
              >
                <img
                    src={otherMember.profileURL}
                    alt=""
                    style={{
                      width: "8rem",
                      height: "8rem",
                      marginTop: "100px",
                      clipPath: "circle(50% at 50% 50%)",
                    }}
                />
              </Typography>
              <Typography
                  variant="body2"
                  sx={{
                    color: "#000000",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    fontSize: "1.5rem",
                  }}
              >
                {otherMember.nickname}
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                <Typography>
                  {`매너온도 : ${otherMember.score}℃`}
                  {getEmoticonByScore(otherMember.score)}
                </Typography>
                <BorderLinearProgress
                    variant="determinate"
                    value={(otherMember.score / 100) * 100}
                    color={textColor}
                    sx={{ width: '50%', margin: 'auto', marginTop: '5px' }}
                />
              </Typography>
              {/* 차단 버튼 */}
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleBlockButtonClick}
                >
                  차단
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleFollowingButtonClick}
                    style={{ marginLeft: "10px" }}
                >
                  팔로우
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={getOtherMemberProduct}
                    style={{ marginLeft: "10px" }}
                >
                  판매상품 보기
                </Button>
              </div>
            </div>
        )}
      </div>
  );
};

export default OtherProfileForm;
