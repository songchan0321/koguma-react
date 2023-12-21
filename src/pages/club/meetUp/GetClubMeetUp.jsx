import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getClubMeetUp } from "../../../apis/api/club";
import { Paper, Typography } from "@mui/material";
import JoinedMeetUpMember from "../../../component/club/meetUp/JoinedMeetUpMember";
import TopBarClub from "../../../component/club/common/TopBarClub";
import MarginEmpty from "../../../component/payment/MarginEmpty";

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

  return (
    <>
      <TopBarClub>일정 상세 정보</TopBarClub>
      <MarginEmpty value={100} />
      <Paper style={{ marginLeft: "10px" }}>
        <div style={{ marginLeft: "10px" }}>
          <Typography variant="h5">일정이름</Typography>
          <MarginEmpty value={10} />

          <Typography variant="h6">{meetUp.title}</Typography>
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
      </Paper>
    </>
  );
};

export default GetClubMeetUp;
