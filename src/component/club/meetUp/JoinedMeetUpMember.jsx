import { useEffect, useState } from "react";
import { listJoinMeetUpMemberAPI } from "../../../apis/api/club";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const JoinedMeetUpMember = ({ meetUpId }) => {
  const navigate = useNavigate();
  const [joinMemberList, setJoinMemberList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listJoinMeetUpMemberAPI(meetUpId);
        setJoinMemberList(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [meetUpId]);

  const listJoinMeetUpMember = () => {
    navigate(`/club/meet-up/member/list`, {
      state: { members: joinMemberList },
    });
  };

  const fixedButtonStyle = {
    bottom: 0,
    left: 20,
    width: "90%",
    padding: "5px",
    textAlign: "center",
  };

  return (
    <div>
      <h2>참여중인 모임원 </h2>
      {/* 배열이 비어 있는지 확인 후 slice 메서드 사용 */}
      {joinMemberList.length > 0 &&
        joinMemberList
          .slice(0, 3)
          .map((meetUpMember) => (
            <div key={meetUpMember.id}>{meetUpMember.nickname}</div>
          ))}
      <Button
        variant="contained"
        color="secondary"
        style={fixedButtonStyle}
        onClick={listJoinMeetUpMember}
      >
        참여 모임원 전체 보기
      </Button>
    </div>
  );
};
export default JoinedMeetUpMember;
