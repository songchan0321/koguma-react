import { Link, useLocation } from "react-router-dom";
import TopBarClub from "../../component/club/common/TopBarClub";
import { List, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import ParentComponent from "./board/ParentComponent";
import MarginEmpty from "../../component/payment/MarginEmpty";

const ClubSettings = () => {
  const location = useLocation();
  const { clubId } = location.state;

  useEffect(() => {
    const fetchData = async () => {};
  });

  return (
    <>
      <TopBarClub> 모임 설정 </TopBarClub>
      <MarginEmpty />
      <Paper style={{ marginLeft: "10px" }}>
        <div>
          <List>
            <Typography variant="h6">프로필</Typography>
            <Paper>
              <div style={backgroundStyle}>
                <p>내 프로필 보기</p>
              </div>
            </Paper>

            <MarginEmpty value={20} />
            <Typography variant="h6">모임 운영</Typography>

            <div style={backgroundStyle}>
              <Link to={`/club/post/category/add`} state={{ clubId: clubId }}>
                <p>게시판 카테고리 관리</p>
              </Link>
            </div>
            <div style={backgroundStyle}>
              <ParentComponent></ParentComponent>{" "}
            </div>
            <div style={backgroundStyle}>
              <p>내 프로필 보기</p>
            </div>
            <div style={backgroundStyle}>
              <p>내 프로필 보기</p>
            </div>
            <div style={backgroundStyle}>
              <p>내 프로필 보기</p>
            </div>
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
