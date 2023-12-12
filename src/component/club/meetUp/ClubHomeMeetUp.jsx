import { useEffect, useState } from "react";
import { getMeetUpAPI, listMeetUpAPI } from "../../../apis/api/club";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ClubHomeMeetUp = ({ clubId }) => {
  const [meetUp, setMeetUp] = useState({});
  const [selectedMenu, setSelectedMenu] = useState("예정된 일정");
  const meetUpMenu = ["예정된 일정", "종료된 일정"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMeetUpAPI(clubId);
        setMeetUp(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId]);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div>
      <div>
        <Link to="/club/meet-up/add">
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "100%", borderRadius: 0 }}
          >
            + 일정 만들기
          </Button>
        </Link>
      </div>
      <br />
      <div>
        {meetUpMenu.map((menu) => (
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
      {selectedMenu === "예정된 일정" ? (
        <MeetUpList clubId={clubId} selectedMenu={selectedMenu} />
      ) : (
        <p>종료된 일정</p>
      )}
      <div></div>
    </div>
  );
};

const MeetUpList = ({ clubId, selectedMenu }) => {
  const [meetUpList, setMeetUpList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedMenu === "예정된 일정") {
          const data = await listMeetUpAPI(clubId);
          setMeetUpList(data);
        } else {
          const data = await listMeetUpAPI(clubId);
          setMeetUpList(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId, selectedMenu]);

  return (
    <div>
      {meetUpList &&
        meetUpList.map((meetUp) => <div key={meetUp.id}>{meetUp.title}</div>)}
    </div>
  );
};

export default ClubHomeMeetUp;
