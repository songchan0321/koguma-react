import { useLocation, useNavigate } from "react-router-dom";
import TopBarClub from "../../component/club/common/TopBarClub";
import { List, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import MarginEmpty from "../../component/payment/MarginEmpty";

const ClubSettings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clubId } = location.state;
  const { clubMember } = location.state;

  useEffect(() => {
    const fetchData = async () => {};
  });

  return (
    <>
      <TopBarClub> 모임 설정 </TopBarClub>
      <MarginEmpty />
      <Paper style={{ marginLeft: "10px", marginRight: "10px" }} elevation={0}>
        <div>
          <List>
            <Typography variant="h6">프로필</Typography>
            <Paper elevation={0}>
              <div style={backgroundStyle}>
                <Typography variant="body1">내 프로필 보기</Typography>
              </div>
            </Paper>

            <MarginEmpty value={20} />
            <Typography variant="h6">모임 운영</Typography>

            <Paper elevation={0}>
              <div style={backgroundStyle}>
                <Typography variant="body1">모임 최대 인원 관리</Typography>
              </div>
              <div style={backgroundStyle}>
                <Typography variant="body1">모임 이름 수정</Typography>
              </div>
              <div style={backgroundStyle}>
                <Typography variant="body1">모임 소개 수정</Typography>
              </div>
              <div style={backgroundStyle}>
                <Typography variant="body1">모임장 위임</Typography>
              </div>
              <div
                style={backgroundStyle}
                onClick={() => {
                  navigate(`/club/post/category/add`, {
                    state: { clubId: clubId },
                  });
                }}
              >
                <Typography variant="body1">게시판 카테고리 관리</Typography>
              </div>
            </Paper>

            <MarginEmpty value={20} />
          </List>
        </div>
      </Paper>
    </>
  );
};

export default ClubSettings;

const backgroundStyle = {
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
};
