import { useEffect, useState } from "react";
import { listMeetUpAPI } from "../../../apis/api/club";
import { Button, MobileStepper } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import ClubMeetUpList from "./ClubMeetUpList";

const ClubHomeMeetUp = ({ clubId, clubMember, selectedMenu }) => {
  const [meetUp, setMeetUp] = useState({});
  const [meetUpState, setMeetUpState] = useState("SCHEDULE");
  const meetUpMenu = ["SCHEDULE", "COMPLETE"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listMeetUpAPI(clubId);
        setMeetUp(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId]);

  const handleMenuClick = (state) => {
    setMeetUpState(state);
  };

  return (
    <>
      {selectedMenu === "meetUp" ? (
        <div>
          <div>
            <Link to={`/club/meet-up/add/${clubId}`}>
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
                variant={meetUpState === menu ? "contained" : "outlined"}
                color="secondary"
                style={{ flex: 1 }}
              >
                {menu === "SCHEDULE" ? "예정된 일정" : "종료된 일정"}
              </Button>
            ))}
          </div>
          {meetUpState === "SCHEDULE" ? (
            <ClubMeetUpList
              clubId={clubId}
              meetUpState={meetUpState}
              clubMember={clubMember}
            />
          ) : (
            <ClubMeetUpList
              clubId={clubId}
              meetUpState={meetUpState}
              clubMember={clubMember}
            />
          )}
          <div></div>
        </div>
      ) : (
        <ClubMeetUpList
          clubId={clubId}
          meetUpState={meetUpState}
          clubMember={clubMember}
        />
      )}
    </>
  );
};

export default ClubHomeMeetUp;
