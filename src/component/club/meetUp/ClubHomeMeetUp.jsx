import { useEffect, useState } from "react";
import { listMeetUpAPI } from "../../../apis/api/club";
import { Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";

import ClubMeetUpList from "./ClubMeetUpList";
import MarginEmpty from "../../payment/MarginEmpty";
import SelectMeetUpList from "./SelectMeetUpList";

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
      <MarginEmpty value={10} />
      {selectedMenu === "일정" ? (
        <div>
          <div>
            <Link to={`/club/meet-up/add/${clubId}`}>
              <Button
                variant="outlined"
                color="secondary"
                style={fixedButtonStyle}
              >
                + 일정 만들기
              </Button>
            </Link>
          </div>
          <MarginEmpty value={10} />
          <div>
            {meetUpMenu.map((menu, index) => (
              <>
                <Chip
                  label={menu === "SCHEDULE" ? "예정된 일정" : "종료된 일정"}
                  key={index}
                  onClick={() => handleMenuClick(menu)}
                  variant={meetUpState === menu ? "contained" : "outlined"}
                  color="secondary"
                  style={{ marginLeft: "10px" }}
                />
              </>
            ))}
          </div>
          {meetUpState === "SCHEDULE" ? (
            <SelectMeetUpList
              clubId={clubId}
              meetUpState={meetUpState}
              clubMember={clubMember}
            />
          ) : (
            <SelectMeetUpList
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

const fixedButtonStyle = {
  bottom: 0,
  left: 15,
  width: "90%",
  padding: "5px",
  textAlign: "center",
};
