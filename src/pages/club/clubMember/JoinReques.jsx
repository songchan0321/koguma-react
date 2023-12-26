import { useLocation, useNavigate } from "react-router-dom";
import { joinRequestAPI } from "../../../apis/api/club";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Container } from "react-bootstrap";
import { useState } from "react";
import TopBarClub from "../../../component/club/common/TopBarClub";
import MarginEmpty from "../../../component/payment/MarginEmpty";

const JoinRequest = () => {
  const location = useLocation();
  const clubId = location.state.clubId;
  const navigator = useNavigate();
  const [joinProfile, setJoinProfile] = useState({
    nickname: "",
    content: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJoinProfile({ ...joinProfile, [name]: value });
  };

  const handleConfirm = async () => {
    try {
      console.log(joinProfile);
      console.log(clubId);
      // API 호출을 통해 서버에 값을 전달
      const response = await joinRequestAPI(clubId, joinProfile);
      console.log(response);
      alert("신청이 완료됐습니다!");
      navigator("/club/" + clubId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <TopBarClub>가입 신청</TopBarClub>
      <MarginEmpty value={60} />
      <div style={{ marginLeft: "10px" }}>
        <div>
          <Typography variant="h4" color={"secondary"}>
            모임장 승인이 필요합니다.{" "}
          </Typography>
        </div>
        <Typography variant="h6">활동명과 자기소개를 기재해주세요. </Typography>

        <br></br>
        <br></br>
        <Container>
          <Box
            sx={{
              width: 300,
              maxWidth: "100%",
            }}
          >
            <Typography variant="h6">모임활동명 </Typography>
            <TextField
              name="nickname"
              value={joinProfile.nickname}
              onChange={handleInputChange}
              label=""
            />
          </Box>
          <MarginEmpty value={20} />
          <Box
            sx={{
              width: 300,
              maxWidth: "100%",
            }}
          >
            <Typography variant="h6">자기소개 </Typography>
            <TextField
              name="content"
              value={joinProfile.content}
              onChange={handleInputChange}
              label=""
            />
          </Box>
        </Container>
        <Box sx={{ textAlign: "center" }}>
          <Button
            style={fixedButtonStyle}
            //   disabled={nextStep && !activeSubmit}
            variant="contained"
            color="secondary"
            onClick={handleConfirm}
          >
            {"확인"}
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default JoinRequest;

const fixedButtonStyle = {
  position: "fixed",
  bottom: 10,
  left: 20,
  width: "90%",
  padding: "5px",
  textAlign: "center",
};
