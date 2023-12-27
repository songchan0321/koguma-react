import React, { useState, useEffect } from "react";
import {
  checkJoinMeetUpAPI,
  joinMeetUpCancelAPI,
  joinMeetUpRequestAPI,
} from "../../../apis/api/club";
import { Button } from "@mui/material";
import { useModal } from "../../../context/ModalContext";

const JoinMeetUpStateButton = ({ clubId, meetUpId, clubMember }) => {
  const { openModal } = useModal();
  const [joinState, setJoinState] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await checkJoinMeetUpAPI(clubId, meetUpId);
        setJoinState(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [clubId, meetUpId]); // clubId와 meetUpId를 의존성으로 추가

  const handleButtonJoin = async () => {
    try {
      await joinMeetUpRequestAPI(meetUpId, clubMember);
      setJoinState(true);
      await openModal("일정 참여가 완료되었습니다.", true, () => {});
    } catch (err) {
      console.log(err);
    }
  };

  const handleButtonCancel = async () => {
    try {
      await joinMeetUpCancelAPI(clubId, meetUpId);
      setJoinState(false);

      await openModal("일정 참여가 취소되었습니다.", true, () => {});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        style={fixedButtonStyle}
        onClick={joinState ? handleButtonCancel : handleButtonJoin}
      >
        {joinState ? "참여 취소" : "참여 하기"}
      </Button>
    </div>
  );
};

export default JoinMeetUpStateButton;

// const fixedButtonStyle = {
//   position: "fixed",
//   bottom: 20,
//   left: 20,
//   width: "90%",
//   padding: "5px",
//   textAlign: "center",
// };

const fixedButtonStyle = {
  bottom: 0,
  left: 0,
  width: "95%",
  padding: "10px",
  textAlign: "center",
};
