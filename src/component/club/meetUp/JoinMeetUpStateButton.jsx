import React, { useState, useEffect } from "react";
import {
  checkJoinMeetUpAPI,
  joinMeetUpCancelAPI,
  joinMeetUpRequestAPI,
} from "../../../apis/api/club";
import { Button } from "@mui/material";

const JoinMeetUpStateButton = ({ clubId, meetUpId, clubMember }) => {
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
  }, [joinState, clubId, meetUpId]); // clubId와 meetUpId를 의존성으로 추가

  const handleButtonJoin = async () => {
    try {
      await joinMeetUpRequestAPI(meetUpId, clubMember);
    } catch (err) {
      console.log(err);
    }
  };

  const handleButtonCancel = async () => {
    try {
      await joinMeetUpCancelAPI(clubId, meetUpId, joinState);
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

const fixedButtonStyle = {
  position: "fixed",
  bottom: 20,
  left: 20,
  width: "90%",
  padding: "5px",
  textAlign: "center",
};
