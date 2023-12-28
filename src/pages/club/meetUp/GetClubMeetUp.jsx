import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getClubMeetUp } from "../../../apis/api/club";
import { Divider, Stack, Typography } from "@mui/material";
import JoinedMeetUpMember from "../../../component/club/meetUp/JoinedMeetUpMember";
import TopBarClub from "../../../component/club/common/TopBarClub";
import MarginEmpty from "../../../component/payment/MarginEmpty";
import JoinMeetUpStateButton from "../../../component/club/meetUp/JoinMeetUpStateButton";
import GetMeetUpMap from "../../../component/club/common/GetMeetUpMap";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Modal from "../../../component/common/Modal";

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
      <Modal />
      <TopBarClub>일정 상세 정보</TopBarClub>
      <MarginEmpty value={80} />
      <div>
        <div style={{ marginLeft: "10px" }}>
          <Typography variant="h5">{meetUp.title}</Typography>
          <MarginEmpty value={15} />

          <Typography>{meetUp.content}</Typography>
          <MarginEmpty value={30} />
        </div>
        <Divider style={{ height: 1, backgroundColor: "grey" }} />
        <MarginEmpty value={15} />
        <div style={{ marginLeft: "10px" }}>
          <Typography variant="h5">참여 중인 모임원</Typography>

          <JoinedMeetUpMember meetUpId={meetUpId} />
        </div>

        <MarginEmpty value={30} />
        <Divider style={{ height: 4, backgroundColor: "grey" }} />
        <MarginEmpty value={5} />

        <div style={{ marginLeft: "10px" }}>
          <Typography variant="h5">일정 장소</Typography>
          <Stack spacing={2}>
            <GetMeetUpMap roadAddr={meetUp.roadAddr} />
            <PlaceOutlinedIcon />
          </Stack>
        </div>
        <MarginEmpty value={30} />

        <MarginEmpty value={15} />

        <MarginEmpty />
      </div>
      <div style={fixedButtonStyle}>
        <Divider style={{ height: 4, backgroundColor: "grey" }} />

        <MarginEmpty value={5} />
        <JoinMeetUpStateButton
          clubId={clubId}
          meetUpId={meetUpId}
          clubMember={clubMember}
        />
      </div>
    </>
  );
};

export default GetClubMeetUp;

const fixedButtonStyle = {
  position: "fixed",

  bottom: 0,
  left: 0,
  width: "100%",
  padding: "5px",
  textAlign: "center",
};
