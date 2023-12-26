import React, { useState } from "react";
import CategoryList from "../../component/club/CategoryList";
import ClubListByCategory from "../../component/club/ClubListByCategory";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link, useNavigate } from "react-router-dom";
import TopBarClub from "../../component/club/common/TopBarClub";
import MyClubList from "../../component/club/MyClubList";
import ClubListStepper from "../../component/club/ClubListStepper";
import MyClubPostList from "../../component/club/board/MyClubPostList";
import MarginEmpty from "../../component/payment/MarginEmpty";
import GeoLocationClub from "../../component/club/GeoLocationClub";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function ClubList() {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState(0); // 초기 값은 0으로 설정
  const [myClubList, setMyClubList] = useState(false);

  const handleTabChange = (event, newValue) => {
    setMyClubList(newValue === 1); // 1이면 내 모임, 0이면 전체 모임
  };

  const buttonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    fontSize: "48px", // 아이콘 크기 조절
    color: "purple",
    cursor: "pointer",
  };

  return (
    <>
      <TopBarClub children={"모임리스트"}>모임리스트</TopBarClub>
      <MarginEmpty />

      <div>
        <div style={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 1,
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={myClubList ? 1 : 0} // 전체 모임과 내 모임을 탭으로 구분
              onChange={handleTabChange} // 탭 변경 시 내 모임 선택
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="category tabs"
            >
              <Tab label="전체 모임" />
              <Tab label="내 모임" />
            </Tabs>
          </Box>
        </div>
        <br />
        {myClubList ? (
          <div>
            <div style={{ margin: "10px" }}>
              <MyClubList style={backgroundStyle} />
            </div>
            <Divider style={{ height: 1, backgroundColor: "grey" }} />
            <div>
              <MyClubPostList style={backgroundStyle} />
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" style={{ marginLeft: "10px" }}>
                  내 근처 모임
                </Typography>
                <div onClick={() => navigate(`/club/list/near`)}>
                  <ArrowForwardIosIcon style={{ marginLeft: "5px" }} />
                </div>
              </div>
              <Divider sx={{ backgroundColor: "black" }} />
              <MarginEmpty value={15} />

              <div
                style={{
                  ...backgroundStyle,
                  marginBottom: "20px",
                  marginLeft: "32px",
                  marginRight: "37px",
                }}
              >
                <GeoLocationClub />
              </div>
            </div>

            <div>
              <CategoryList onCategorySelect={setSelectedCategoryId} />
              <br />
              <div style={{ padding: "10px" }}>
                <ClubListByCategory categoryId={selectedCategoryId} />
              </div>
            </div>
            <div>
              <Link
                to={{ pathname: "/club/add" }}
                style={{ position: "fixed", bottom: "20px", right: "20px" }}
              >
                <AddCircleIcon style={buttonStyle} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ClubList;

const backgroundStyle = {
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  padding: "1px",
};
