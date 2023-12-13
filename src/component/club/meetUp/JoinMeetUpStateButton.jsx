import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import {
  checkJoinMeetUpAPI,
  toggleJoinMeetUpAPI,
} from "../../../apis/api/club";

const JoinMeetUpStateButton = ({ clubId, meetUpId }) => {
  const [joinState, setJoinState] = useState(null);

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

  const handleButtonClick = async () => {
    try {
      // 가입 상태를 토글하는 API 함수 (실제 API 디자인에 따라 조정해야 함)
      await toggleJoinMeetUpAPI(clubId, meetUpId, joinState);

      // API 호출 후 로컬 상태 업데이트
      setJoinState((prevState) => !prevState);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleButtonClick}>
        {joinState ? "참여하기" : "나가기"}
      </Button>
    </div>
  );
};

export default JoinMeetUpStateButton;
