import { useEffect, useState } from "react";
import { countClubMemberAPI, listClubMemberAPI } from "../../../apis/api/club";
import { Avatar, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MarginEmpty from "../../payment/MarginEmpty";

const ClubHomeClubMember = ({ clubId, clubMember }) => {
  const navigator = useNavigate();

  const [clubMembers, setClubMembers] = useState([]);
  const [countClubMember, setCountClubMember] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listClubMemberAPI(clubId);
        setClubMembers(data);
        const count = await countClubMemberAPI(clubId);
        setCountClubMember(count);
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
          <span>
            <Typography variant="h6">모임원 {countClubMember}</Typography>
          </span>
          {clubMembers.length > 0 &&
            clubMembers.slice(0, 3).map((clubMember, index) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Card
                  key={clubMember.id}
                  style={{ marginRight: 10, boxShadow: "none" }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={clubMember.memberDTO.profileURL}
                    sx={{ width: 40, height: 40 }}
                  />
                </Card>
                <Card
                  key={index}
                  style={{ flexGrow: 1, cursor: "pointer", boxShadow: "none" }}
                  onClick={() => navigator(`/club/member/${clubMember.id}`)}
                >
                  <CardContent>
                    <Typography variant="body2">
                      {clubMember.nickname}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          <MarginEmpty value={15} />
          <Button
            variant="contained"
            color="secondary"
            style={fixedButtonStyle}
            onClick={listClubMember}
            size="large"
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
  left: 0,
  width: "100%",
  padding: "5px",
  textAlign: "center",
};

const backgroundStyle = {
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
};
