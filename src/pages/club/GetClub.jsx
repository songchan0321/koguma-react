import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { checkClubMemberAPI, getClubAPI } from "../../apis/api/club";
import { BottomNavigationAction, Box, Button, CardMedia } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ClubHome from "../../component/club/ClubHome";
import ClubHomeMeetUp from "../../component/club/meetUp/ClubHomeMeetUp";
import ClubHomeClubMember from "../../component/club/clubMember/ClubHomeClubMember";
import TopBarClub from "../../component/club/common/TopBarClub";
import JoinRequestButton from "../../component/club/clubMember/JoinRequestButton";
import ClubSettings from "./ClubSettings";
import Diversity3Icon from "@mui/icons-material/Diversity3";

import ClubHomePostList from "../../component/club/board/ClubHomePostList";
import GetClubChat from "./chat/GetClubChat";
import MapTest from "../../component/club/common/MapTest";

const GetClub = () => {
  const navigator = useNavigate();
  const { clubId } = useParams();
  const [club, setClub] = useState({});
  const [clubMember, setClubMember] = useState({});
  const [selectedMenu, setSelectedMenu] = useState("home");
  const menuList = ["home", "board", "meetUp", "chatRoom"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClubAPI(clubId);
        setClub(data);
        const checkClubMember = await checkClubMemberAPI(clubId);
        setClubMember(checkClubMember);
        console.log(checkClubMember);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId]); // clubId가 변경될 때마다 데이터를 다시 가져오도록

  const handleMenuClick = async (menu) => {
    if (menu !== "home" && clubMember.activeFlag === null) {
      alert("모임원만 이용할 수 있습니다.");
      return;
    }

    setSelectedMenu(menu);
  };

  const listClubMember = () => {
    navigator(`/club/members/${clubId}`, {
      state: { clubMember: clubMember },
    });
  };

  const clubSetting = () => {
    navigator(`/club/settings`, {
      state: { clubId: clubId },
    });
  };
  return (
    <>
      <TopBarClub children={"asd"}>{club.title}</TopBarClub>
      <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 80px)" }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <CardMedia
            component="img"
            height="120"
            image="/photo.png"
            alt="Paella dish"
          />
        </Box>
        <hr></hr>
        <div
          style={{
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>
            <h1>{club.title}</h1>
          </span>
          <div>
            <span>
              <BottomNavigationAction
                label="모임"
                value="club"
                onClick={listClubMember}
                icon={<Diversity3Icon sx={{ fontSize: "1.5rem" }} />}
              />
            </span>
            <span>
              <BottomNavigationAction
                onClick={clubSetting}
                icon={<SettingsIcon sx={{ fontSize: "1.5rem" }} />}
              ></BottomNavigationAction>
              {/* <Link to={`/club/settings`} state={{ clubId: clubId }}>
                <SettingsIcon />
              </Link> */}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", width: "100%" }}>
          {menuList.map((menu) => (
            <Button
              key={menu}
              onClick={() => handleMenuClick(menu)}
              variant={selectedMenu === menu ? "contained" : "outlined"}
              color="secondary"
              style={{ flex: 1 }}
            >
              {menu}
            </Button>
          ))}
        </div>
        <div>
          {selectedMenu === "home" && (
            <div>
              <div style={backgroundStyle}>
                <ClubHome club={club} />
              </div>
              <div style={backgroundStyle}>
                <ClubHomeMeetUp
                  clubId={clubId}
                  clubMember={clubMember}
                  selectedMenu={selectedMenu}
                />
              </div>
              <div style={backgroundStyle}>
                <ClubHomeClubMember clubId={clubId} clubMember={clubMember} />
              </div>
            </div>
          )}
          {selectedMenu === "board" && (
            <ClubHomePostList clubId={clubId} clubMember={clubMember} />
          )}
          {selectedMenu === "meetUp" && (
            <ClubHomeMeetUp
              clubId={clubId}
              clubMember={clubMember}
              selectedMenu={selectedMenu}
            />
          )}
          {selectedMenu === "chatRoom" && (
            <GetClubChat clubId={clubId} clubMember={clubMember} />
          )}
        </div>
        {!clubMember.activeFlag === true && (
          <JoinRequestButton clubId={clubId} />
        )}
      </Box>
    </>
  );
};

export default GetClub;

const fixedButtonStyle = {
  position: "fixed",
  bottom: 10,
  left: 20,
  width: "90%",
  padding: "5px",
  textAlign: "center",
};

const backgroundStyle = {
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
};
