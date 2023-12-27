import { useEffect, useState } from "react";
import { listJoinMeetUpMemberAPI } from "../../../apis/api/club";
import { Avatar, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const JoinedMeetUpMember = ({ meetUpId }) => {
  const navigate = useNavigate();
  const [joinMemberList, setJoinMemberList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listJoinMeetUpMemberAPI(meetUpId);
        console.log(data);
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
      {/* 배열이 비어 있는지 확인 후 slice 메서드 사용 */}
      {joinMemberList.length > 0 &&
        joinMemberList.map((meetUpMember, index) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 10,
            }}
            key={index}
          >
            <Card
              key={meetUpMember.id}
              style={{ marginLeft: "10px", boxShadow: "none" }}
            >
              <Avatar
                alt="Remy Sharp"
                src={meetUpMember.clubMemberDTO.memberDTO.profileURL || ""}
                sx={{ width: 40, height: 40 }}
              />
            </Card>

            <Card
              key={index}
              style={{ flexGrow: 1, cursor: "pointer", boxShadow: "none" }}
              // onClick={() => navigator(`/club/member/${clubMember.id}`)}
            >
              <CardContent>
                <Typography>{meetUpMember.clubMemberDTO.nickname}</Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      {/* <Button
        variant="contained"
        color="secondary"
        style={fixedButtonStyle}
        onClick={listJoinMeetUpMember}
      >
        참여 모임원 전체 보기
      </Button> */}
    </div>
  );
};
export default JoinedMeetUpMember;
