import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  cancelJoinReauestAPI,
  checkJoinRequestAPI,
} from "../../../apis/api/club";

const JoinRequestButton = ({ clubId }) => {
  const [checkJoinRequest, setCheckJoinRequest] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await checkJoinRequestAPI(clubId);
        setCheckJoinRequest(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId]);

  const handleCancel = async () => {
    try {
      const response = await cancelJoinReauestAPI(clubId);
      const data = await checkJoinRequestAPI(clubId);
      console.log(response);
      alert("취소가 완료되었습니다.");
      setCheckJoinRequest(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {!checkJoinRequest ? (
        <Link to={"/club/join/request"} state={{ clubId: clubId }}>
          <Button
            variant="contained"
            color="secondary"
            style={fixedButtonStyle}
          >
            모임 가입하기
          </Button>
        </Link>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          style={fixedButtonStyle}
          onClick={handleCancel}
        >
          가입 신청 취소
        </Button>
      )}
    </>
  );
};

export default JoinRequestButton;

const fixedButtonStyle = {
  position: "fixed",
  bottom: 10,
  left: 20,
  width: "90%",
  padding: "5px",
  textAlign: "center",
};
