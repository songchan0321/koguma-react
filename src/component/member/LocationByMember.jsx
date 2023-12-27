import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ScoreColor from "../common/ScoreColor";

const LocationByMember = ({ data }) => {
  const navigate = useNavigate();
  console.log(data);

  const getMember = (memberId) => {
    navigate(`/member/other/get/${memberId}`);
  };

  return data.map((member, idx) => {
    return (
      <Card sx={{ maxWidth: "100%" }}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              style={{ width: "48px", height: "48px" }} // Avatar 크기 조정
            >
              <img
                src={member.profileURL}
                alt="profile"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                }} // 이미지 크기 및 모양 조정
              />
            </Avatar>
          }
          onClick={() => getMember(member.id)}
          title={
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" color="textSecondary">
                {member.nickname}
              </Typography>
              <Typography variant="subtitle3" color="text">
                <ScoreColor score={member.score}></ScoreColor>
              </Typography>
            </Box>
          }
          subheader={
            <>
              <Typography variant="subtitle2" color="textSecondary">
                {member.dong}
              </Typography>
            </>
          }
        />
      </Card>
    );
  });
};

export default LocationByMember;
