import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const AddClubNicknameForm = ({ onPrev, onNext, data }) => {
  const [formData, setFormData] = useState({
    categoryId: data.categoryId || "", // 기존 데이터가 있으면 사용, 없으면 빈 문자열
    title: data.title || "", // 기존 데이터가 있으면 사용, 없으면 빈 문자열
    content: data.content || "", // 기존 데이터가 있으면 사용, 없으면 빈 문자열
    urls: data.urls || "",
    nickname: data.nickname || "",
    memberContent: data.memberContent || "",
    maxCapacity: data.maxCapacity || "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    console.log(`handleInputChange`);
    console.log(formData);
    console.log(`asdfsdasdf`);
  };
  const handlePrevClick = () => {
    onPrev();
  };

  const handleNextClick = () => {
    const nickname = document.getElementById("nickname").value;
    const memberContent = document.getElementById("memberContent").value;
    alert(nickname);
    alert(memberContent);

    alert(formData);
    console.log(`handleNextClick 555`);
    console.log(formData);
    console.log(`handleNextClick 555`);
    onNext(formData);
  };

  return (
    <>
      <div>
        <Typography
          variant="h5"
          style={{ marginTop: "20px", marginLeft: "30px" }}
        >
          활동명을 설정해주세요 !
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          style={{ marginTop: "20px", marginLeft: "30px" }}
        >
          활동명은 이 모임에서만 사용하는 닉네임 입니다.
        </Typography>

        <Container style={{ marginTop: "30px", marginLeft: "20px" }}>
          <Typography variant="h6" style={{ marginLeft: "" }}>
            활동명
          </Typography>
          <Box
            sx={{
              width: 300,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label="활동명을 입력해주세요 ! "
              id="nickname"
              color="secondary"
              value={formData.nickname}
              onChange={handleInputChange}
            />
          </Box>
        </Container>

        <Container style={{ marginTop: "30px", marginLeft: "20px" }}>
          <Typography variant="h6" style={{ marginLeft: "" }}>
            활동명
          </Typography>
          <Box
            sx={{
              width: 300,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label="자기소개  "
              id="memberContent"
              color="secondary"
              value={formData.memberContent}
              onChange={handleInputChange}
            />
          </Box>
        </Container>

        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <Button
            variant="contained"
            color="secondary"
            style={backButtonStyle}
            onClick={handlePrevClick}
          >
            이전
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={nextButtonStyle}
            onClick={handleNextClick}
          >
            다음
          </Button>
        </Paper>
      </div>
    </>
  );
};

export default AddClubNicknameForm;

const nextButtonStyle = {
  position: "fixed",

  bottom: 20,
  right: 30, // 변경된 부분
  width: "45%",
  padding: "5px",
  textAlign: "center",
};

const backButtonStyle = {
  position: "fixed",

  bottom: 20,
  left: 40,
  width: "20%",
  padding: "5px",
  textAlign: "center",
};
