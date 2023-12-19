import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import "./ClubCommoncss.css";

const AddClubDetailForm = ({ onPrev, onNext, data }) => {
  const handlePrevClick = () => {
    onPrev();
  };

  const handleNextClick = () => {
    // 여기에서 필요한 데이터를 다음 페이지로 전달
    onNext({ additionalData: "someValue" });
  };
  return (
    <>
      <div>
        <Typography
          variant="h4"
          style={{ marginTop: "20px", marginLeft: "30px" }}
        >
          모임을 소개해주세요 !
        </Typography>

        <Container style={{ marginTop: "30px", marginLeft: "20px" }}>
          <Typography variant="h5" style={{ marginLeft: "" }}>
            모임명
          </Typography>
          <Box
            sx={{
              width: 300,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label="모임명을 입력해주세요"
              id="fullWidth"
              color="secondary"
            />
          </Box>
        </Container>

        <Container style={{ marginTop: "30px", marginLeft: "20px" }}>
          <Typography variant="h5" style={{ marginLeft: "" }}>
            모임소개
          </Typography>
          <Box
            sx={{
              width: 300,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label="모임 소개를 입력해주세요"
              id="fullWidth"
              color="secondary"
            />
          </Box>
        </Container>
      </div>

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
    </>
  );
};

export default AddClubDetailForm;

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
