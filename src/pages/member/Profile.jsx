import React, { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../../component/member/ProfileForm";
import { authInstance } from "../../apis/utils/instance";
import BottomBar from "../../component/common/BottomBar";
import SettingsIcon from "@mui/icons-material/Settings";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from "@mui/system";
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'; //30~39
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'; //40~59
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'; //20~29
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'; // 60~

const Profile = ({score}) => {
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 5,
    backgroundColor: "lightgrey",
  }));
  let textColor;

  // Score에 따라 적절한 색상 설정
  if (member?.score <= 36.0) {
    textColor = "info"; // 파란색
  } else if (member?.score > 36.0 && member?.score <= 42.0) {
    textColor = "success"; // 초록색
  } else if (member?.score > 42.0 && member?.score <= 50.0) {
    textColor = "warning"; // 노란색
  } else {
    textColor = "error"; // 빨간색
  }

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        // 첫 번째 API 호출
        const response1 = await authInstance.get("/member/profile/get", {
          headers: {
            Accept: "application/json",
          },
        });
        setMember(response1.data);

        // 두 번째 API 호출
        const response2 = await authInstance.get("/member/profile/get", {
          headers: {
            Accept: "application/json",
          },
        });
        setProfileImageUrl(response2.data);
        setLoading(false);
      } catch (error) {
        console.error("오류 발생:", error);
        // 오류 발생 시에도 로딩 상태 갱신
        setLoading(false);
      }
    };

    fetchMemberData();
  }, []);
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
      <Box p={3} sx={{ overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}>
        <Grid container spacing={2} justifyContent="flex-end" alignItems="flex-start">
          {/* 내 정보 수정 버튼 */}
          <Grid item>
            <IconButton
                onClick={() => navigate('/member/update')}
                variant="outlined"
                sx={{ width: '100px', height: '40px', color: 'black' }}
                startIcon={<SettingsIcon />}
            >
              <SettingsIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontSize: 12 }}>
                내 정보 수정
              </Typography>
            </IconButton>
          </Grid>
          {/* 로그아웃 버튼 */}
          <Grid item>
            <IconButton
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/common/login");
                }}
                variant="outlined"
                color="black"
                sx={{ width: '100px', height: '40px', color: 'black' }}
                startIcon={<MeetingRoomIcon />}
            >
              <MeetingRoomIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontSize: 12 }}>
                로그아웃
              </Typography>
            </IconButton>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            {/* 로딩 중일 때 CircularProgress 표시 */}
            {loading ? (
                <CircularProgress />
            ) : (
                // 로딩이 완료되면 멤버 이미지 표시
                member && member.profileURL ? (
                    <img src={member.profileURL} alt="" style={{
                      width: "8rem",
                      height: "8rem",
                      marginLeft: '110px',
                      marginTop: '30px',
                      clipPath: 'circle(50% at 50% 50%)',
                    }} />
                ) : (
                    // 이미지가 없을 때 아이콘 등의 대체 컨텐츠를 표시
                    <div></div>
                )
            )}
          </Grid>
          <Grid item xs={12} md={8}>
            {/* 닉네임 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <Typography variant="h5" gutterBottom>
                {/* 로딩 중일 때 CircularProgress 표시 */}
                {loading ? (
                    <CircularProgress size={20} />
                ) : (
                    // 로딩이 완료되면 멤버 닉네임 표시
                    member?.nickname
                )}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {/* 로딩 중일 때 CircularProgress 표시 */}
                {loading ? (
                    <CircularProgress size={20} />
                ) : (
                    <>
                      <Typography>{`매너온도 : ${member?.score}℃`}
                        {getEmoticonByScore(member?.score)}
                      </Typography>
                      <BorderLinearProgress variant="determinate" value={(member?.score / 100) * 100} color={textColor} />
                    </>
                )}
              </Typography>
            </div>
            <ProfileForm navigate={navigate} />
          </Grid>
        </Grid>
        <BottomBar />
      </Box>
  );
};

export default Profile;
