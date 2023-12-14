import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getClubMeetUp } from "../../../apis/api/club";
import { Box } from "@mui/material";
import JoinedMeetUpMember from "../../../component/club/meetUp/JoinedMeetUpMember";
import TopBarClub from "../../../component/club/common/TopbarClub";

const GetClubMeetUp = () => {
  const { meetUpId } = useParams();
  const location = useLocation();
  const { clubId } = location.state || {};
  const [meetUp, setMeetUp] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClubMeetUp(meetUpId);
        setMeetUp(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [meetUpId, clubId]);

  const fixedButtonStyle = {
    position: "fixed",
    bottom: 10,
    left: 20,
    width: "90%",
    padding: "10px",
    textAlign: "center",
  };

  const divStyle = {
    lef: 20,
    width: "90%",
    padding: "10px",
  };

  return (
    <>
      <TopBarClub>일정 상세 정보</TopBarClub>
      <Box>
        <div style={divStyle}>
          <h2>{meetUp && meetUp.title}</h2>
          <br></br>
          <hr></hr>
        </div>
        <div>
          <JoinedMeetUpMember meetUpId={meetUpId} />
          <br />
          <hr />
        </div>
        <div>
          <h2>일정 장소</h2>
        </div>
      </Box>
    </>
  );
};

export default GetClubMeetUp;
