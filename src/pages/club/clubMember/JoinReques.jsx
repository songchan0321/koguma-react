import { useLocation, useNavigate } from "react-router-dom";
import { checkClubMemberAPI, joinRequestAPI } from "../../../apis/api/club";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Container } from "react-bootstrap";
import { useState } from "react";

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
      // API 호출을 통해 서버에 값을 전달
      const response = await joinRequestAPI(clubId, joinProfile);
      console.log(response);
      navigator("/club/" + clubId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <Typography variant="h4">모임장 승인이 필요합니다. </Typography>
      </div>
      <Typography variant="h6">활동명과 자기소개를 기재해주세요. </Typography>

      <br></br>
      <br></br>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "90%",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h6">모임활동명 </Typography>
        <TextField
          name="nickname"
          value={joinProfile.nickname}
          onChange={handleInputChange}
          label=""
        />
      </Box>
      <Container>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "90%",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h6">자기소개 </Typography>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "90%",
            },
          }}
          noValidate
          autoComplete="off"
        >
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
