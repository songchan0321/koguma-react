import React, { useState } from "react";
import CategoryList from "../../component/club/CategoryList";
import ClubListByCategory from "../../component/club/ClubListByCategory";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import TopBarClub from "../../component/club/common/TopBarClub";
import TopBar from "../../component/payment/TopBar";

function ClubList() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(29);
  const [myClubList, setMyClubList] = useState(false);

  const handleAllClubsClick = () => {
    setMyClubList(false);
  };

  const handleMyClubsClick = () => {
    setMyClubList(true);
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
      <div position="fixed" sx={{ textAlign: "center", mb: 1.5 }}>
        <TopBarClub>모임 리스트 </TopBarClub>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <span style={{ flex: 1, textAlign: "center" }}>
            <Button
              variant="contained"
              color={myClubList ? "primary" : "secondary"}
              onClick={handleAllClubsClick}
            >
              전체 모임
            </Button>
          </span>
          <span style={{ flex: 1, textAlign: "center" }}>
            <Button
              variant="contained"
              color={myClubList ? "secondary" : "primary"}
              onClick={handleMyClubsClick}
            >
              내 모임
            </Button>
          </span>
        </div>
        <br />
        {myClubList ? (
          <div>내모임</div>
        ) : (
          <div>
            <div>
              <CategoryList onCategorySelect={setSelectedCategoryId} />
              <br />
              <ClubListByCategory categoryId={selectedCategoryId} />
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
