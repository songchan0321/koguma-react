import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { checkClubMemberAPI, getClubAPI } from "../../apis/api/club";
import { Box, Button, CardMedia } from "@mui/material";
import ClubHome from "../../component/club/ClubHome";
import ClubHomeMeetUp from "../../component/club/meetUp/ClubHomeMeetUp";
import ClubHomeClubMember from "../../component/club/clubMember/ClubHomeClubMember";
import TopBarClub from "../../component/club/common/TopbarClub";

const GetClub = () => {
  const { clubId } = useParams();
  //const dispatch = useDispatch();
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

  return (
    <>
      <TopBarClub children={"asd"}>{club.title}</TopBarClub>
      <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 80px)" }}>
        <Box>
          <CardMedia
            component="img"
            height="120"
            image="/photo.png"
            alt="Paella dish"
          />
        </Box>
        <hr></hr>
        <div>
          <h1>{club.title}</h1>
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
          {selectedMenu === "board" && <div>게시판 컴포넌트</div>}
          {selectedMenu === "meetUp" && (
            <ClubHomeMeetUp
              clubId={clubId}
              clubMember={clubMember}
              selectedMenu={selectedMenu}
            />
          )}
          {selectedMenu === "chatRoom" && <div>채팅 컴포넌트</div>}
        </div>
        {!clubMember.activeFlag === true && (
          <Link to={"/club/join/request"} state={{ clubId: clubId }}>
            <Button
              variant="contained"
              color="secondary"
              style={fixedButtonStyle}
            >
              모임 가입하기
            </Button>
          </Link>
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
