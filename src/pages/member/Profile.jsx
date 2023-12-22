import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../../component/member/ProfileForm";
import { authInstance } from "../../apis/utils/instance";
import BottomBar from "../../component/common/BottomBar";
import SettingsIcon from "@mui/icons-material/Settings";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const Profile = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
      <Box p={3} sx={{ overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}>
        <Grid container spacing={2} justifyContent="flex-end" alignItems="flex-start">
          {/* 내 정보 수정 버튼 */}
          <Grid item>
            <IconButton
                onClick={() => navigate('/member/update')}
                variant="outlined"
                color="secondary"
                sx={{ width: '100px', height: '40px' }}
                startIcon={<SettingsIcon />}
            >
              <SettingsIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2" sx={{  fontSize: 12 }}>
                내 정보 수정
              </Typography>
            </IconButton>
          </Grid>
          {/* 로그아웃 버튼 */}
          <Grid item>
            {/* 수정: marginLeft 속성 추가 */}
            <IconButton
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/common/login");
                }}
                variant="outlined"
                color="secondary"
                sx={{ width: '100px', height: '40px' }}
                startIcon={<MeetingRoomIcon />}
            >
              <MeetingRoomIcon sx={{fontSize: 20}}/>
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
              <Typography variant="h4" gutterBottom>
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
                    // 로딩이 완료되면 멤버 Score 표시
                    `매너온도: ${member?.score}℃`
                )}
              </Typography>
            </div>
            {/* ProfileForm 컴포넌트 추가 */}
            <ProfileForm navigate={navigate} />
          </Grid>
          {/* ... 나머지 컴포넌트들 추가 */}
        </Grid>
        <BottomBar />
      </Box>
  );
};

export default Profile;
