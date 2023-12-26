import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getClubMeetUp } from "../../../apis/api/club";
import { Card, Divider, Paper, Stack, Typography } from "@mui/material";
import JoinedMeetUpMember from "../../../component/club/meetUp/JoinedMeetUpMember";
import TopBarClub from "../../../component/club/common/TopBarClub";
import MarginEmpty from "../../../component/payment/MarginEmpty";
import JoinMeetUpStateButton from "../../../component/club/meetUp/JoinMeetUpStateButton";
import GetMeetUpMap from "../../../component/club/common/GetMeetUpMap";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

const GetClubMeetUp = () => {
  const { meetUpId } = useParams();
  const location = useLocation();
  const clubId = location.state.clubId;
  const { clubMember } = location.state || {};
  const [meetUp, setMeetUp] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClubMeetUp(meetUpId);
        setMeetUp(data);

        console.log(`meetUp data => ${meetUp}`);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [meetUpId, clubMember]);

  return (
    <>
      <TopBarClub>일정 상세 정보</TopBarClub>
      <MarginEmpty value={80} />
      <Paper style={{ position: "relative" }} elevation={0}>
        <div style={{ marginLeft: "10px" }}>
          <Typography variant="h5">{meetUp.title}</Typography>
          <MarginEmpty value={15} />

          <Typography>{meetUp.content}</Typography>
          <MarginEmpty value={30} />
        </div>
        <Divider style={{ flex: 1, borderColor: "black" }} />
        <MarginEmpty value={15} />
        <div style={{ marginLeft: "10px" }}>
          <Typography variant="h5">참여 중인 모임원</Typography>

          <JoinedMeetUpMember meetUpId={meetUpId} />
          <MarginEmpty value={30} />
          <Divider style={{ flex: 1, borderColor: "black" }} />
          <MarginEmpty value={15} />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <Typography variant="h5">일정 장소</Typography>
          <Stack spacing={2}>
            <GetMeetUpMap roadAddr={meetUp.roadAddr} />
            <div>
              <PlaceOutlinedIcon />
              <p>테스트</p>
            </div>
          </Stack>
        </div>
        <MarginEmpty />
      </Paper>
      <JoinMeetUpStateButton
        clubId={clubId}
        meetUpId={meetUpId}
        clubMember={clubMember}
      />
    </>
  );
};

export default GetClubMeetUp;

const fixedButtonStyle = {
  position: "fixed",
  bottom: 20,
  left: 20,
  width: "90%",
  padding: "5px",
  textAlign: "center",
};
