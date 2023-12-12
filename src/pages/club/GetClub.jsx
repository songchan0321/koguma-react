import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClubAPI } from "../../apis/api/club";
import { Button } from "@mui/material";
import ClubHome from "../../component/club/ClubHome";
import ClubHomeMeetUp from "../../component/club/meetUp/ClubHomeMeetUp";

const GetClub = () => {
  const { clubId } = useParams();
  const [club, setClub] = useState({});
  const [selectedMenu, setSelectedMenu] = useState("home");
  const menuList = ["home", "board", "meetUp", "chatRoom"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClubAPI(clubId);
        setClub(data);
        console.log(data.title);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId]); // clubId가 변경될 때마다 데이터를 다시 가져오도록

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <>
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
      <hr></hr>

      {selectedMenu === "home" && (
        <div>
          <div>
            <ClubHome club={club} />
          </div>
          <div>
            <ClubHomeMeetUp clubId={clubId} />
            <hr />
          </div>
          <div>
            <p>게시글 정보 들어갈 예정 ClubHome에 다 때려넣자</p>
          </div>
        </div>
      )}
      {selectedMenu === "board" && <div>게시판 컴포넌트</div>}
      {selectedMenu === "meetUp" && <ClubHomeMeetUp clubId={clubId} />}
      {selectedMenu === "chatRoom" && <div>채팅 컴포넌트</div>}
    </>
  );
};

export default GetClub;
