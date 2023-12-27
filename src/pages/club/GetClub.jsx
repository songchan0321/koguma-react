import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkClubMemberAPI, getClubAPI } from "../../apis/api/club";
import {
  Box,
  Button,
  CardMedia,
  Divider,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ClubHome from "../../component/club/ClubHome";
import ClubHomeMeetUp from "../../component/club/meetUp/ClubHomeMeetUp";
import ClubHomeClubMember from "../../component/club/clubMember/ClubHomeClubMember";
import TopBarClub from "../../component/club/common/TopBarClub";
import JoinRequestButton from "../../component/club/clubMember/JoinRequestButton";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ClubHomePostList from "../../component/club/board/ClubHomePostList";
import GetClubChat from "./chat/GetClubChat";
import MarginEmpty from "../../component/payment/MarginEmpty";
import Modal from "../../component/common/Modal";
import { useModal } from "../../context/ModalContext";

const GetClub = () => {
  const { openModal } = useModal();
  const navigator = useNavigate();
  const { clubId } = useParams();
  const [club, setClub] = useState({});
  const [clubMember, setClubMember] = useState({});
  const [selectedMenu, setSelectedMenu] = useState("홈");
  const menuList = ["홈", "게시판", "일정", "채팅"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClubAPI(clubId);
        setClub(data);
        const checkClubMember = await checkClubMemberAPI(clubId);
        setClubMember(checkClubMember);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId]);

  const handleMenuClick = async (menu) => {
    if (menu !== "홈" && clubMember.activeFlag === null) {
      await openModal("모임원만 이용할 수 있습니다.", true, () => {});
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
      <Modal />;<TopBarClub children={"asd"}>{club.title}</TopBarClub>
      <MarginEmpty />
      <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 80px)" }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <CardMedia
            component="img"
            image={club.profileImage?.[0]?.url || "fallback_image_url"}
            alt="Paella dish"
          />
        </Box>
        <Divider />
        <div
          style={{
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>
            <Typography variant="h4">{club.title}</Typography>
          </span>
          <div>
            {clubMember.memberRole && (
              <Button
                onClick={listClubMember}
                variant="outlined"
                color="secondary"
              >
                <Diversity3Icon sx={{ fontSize: "1.5rem" }} />
              </Button>
            )}
            {clubMember.memberRole && (
              <Button
                onClick={clubSetting}
                variant="outlined"
                color="secondary"
              >
                <SettingsIcon sx={{ fontSize: "1.5rem" }} />
              </Button>
            )}
          </div>
        </div>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedMenu}
            onChange={(event, newValue) => handleMenuClick(newValue)}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="menu tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            {menuList.map((menu) => (
              <Tab key={menu} label={menu} value={menu} />
            ))}
          </Tabs>
        </Box>
        <div>
          {selectedMenu === "홈" && (
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
          {selectedMenu === "게시판" && (
            <ClubHomePostList clubId={clubId} clubMember={clubMember} />
          )}
          {selectedMenu === "일정" && (
            <ClubHomeMeetUp
              clubId={clubId}
              clubMember={clubMember}
              selectedMenu={selectedMenu}
            />
          )}
          {selectedMenu === "채팅" && (
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

const backgroundStyle = {
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
};
