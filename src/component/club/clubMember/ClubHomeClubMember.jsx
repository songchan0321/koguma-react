import { useEffect, useState } from "react";
import { checkClubMemberAPI, listClubMemberAPI } from "../../../apis/api/club";
import ListClubMember from "./ListClubMember";
import { Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClubHomeClubMember = ({ clubId, clubMember }) => {
  const navigator = useNavigate();

  const [clubMembers, setClubMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listClubMemberAPI(clubId);
        setClubMembers(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId]);

  const listClubMember = () => {
    navigator(`/club/members/${clubId}`, {
      state: { clubMember: clubMember },
    });
  };

  return (
    <div>
      {!clubMember.activeFlag ? (
        <div>
          <p>모임원에게만 보여집니다.</p>
        </div>
      ) : (
        <div>
          {clubMembers.length > 0 &&
            clubMembers.slice(0, 3).map((clubMember) => (
              <Card key={clubMember.id} style={{ marginBottom: 10 }}>
                <CardContent
                  onClick={() => navigator(`/club/member/${clubMember.id}`)}
                >
                  <div>{clubMember.nickname}</div>
                  {/* 여기에 다른 멤버 정보 표시 (예: meetUpMember.email, meetUpMember.role 등) */}
                </CardContent>
              </Card>
            ))}
          <Button
            variant="contained"
            color="secondary"
            style={fixedButtonStyle}
            onClick={listClubMember}
          >
            참여 모임원 전체 보기
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClubHomeClubMember;

const fixedButtonStyle = {
  bottom: 0,
  left: 20,
  width: "90%",
  padding: "5px",
  textAlign: "center",
};

const backgroundStyle = {
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
};
