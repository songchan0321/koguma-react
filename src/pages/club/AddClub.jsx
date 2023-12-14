import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
  Box,
  TextField,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const SetCategory = ({ onNext }) => (
  <div>
    <Typography variant="h5">어떤 모임을 만들까요 ?</Typography>
    {/* Step 1 내용 및 이벤트 처리 */}
    <Button
      onClick={onNext}
      variant="contained"
      color="secondary"
      style={fixedButtonStyle}
    >
      다음
    </Button>
  </div>
);

const SetDetail = ({ onBack, onNext }) => {
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");

  useEffect(() => {
    console.log("clubName:", clubName);
    console.log("clubDescription:", clubDescription);
    return () => {
      setClubName("");
      setClubDescription("");
    };
  }, [clubName, clubDescription]);

  const handleNext = () => {
    console.log("handle Next :", clubName, clubDescription);
    onNext({
      clubName,
      clubDescription,
    });
  };

  return (
    <>
      <Typography variant="h5">모임을 소개해주세요</Typography>
      <div>
        <div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="모임명"
                multiline
                maxRows={4}
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
              />
            </div>
          </Box>
        </div>
        <div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="모임소개"
                multiline
                maxRows={4}
                value={clubDescription}
                onChange={(e) => setClubDescription(e.target.value)}
              />
            </div>
          </Box>
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "95%",
          display: "flex",
          bottom: 10,
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={onBack}
          variant="contained"
          color="secondary"
          style={{ width: "35%", left: 10 }}
        >
          이전
        </Button>
        <Button
          onClick={handleNext}
          variant="contained"
          color="secondary"
          style={{ width: "55%" }}
        >
          다음
        </Button>
      </div>
    </>
  );
};

const SetMaxCapacity = ({ onBack, onNext }) => {
  return (
    <>
      <Typography variant="h5">규모는 얼마나 될까요 ?</Typography>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="capa"
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "95%",
          display: "flex",
          bottom: 10,
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={onBack}
          variant="contained"
          color="secondary"
          style={{ width: "35%", left: 10 }}
        >
          이전
        </Button>
        <Button
          onClick={onNext}
          variant="contained"
          color="secondary"
          style={{ width: "55%" }}
        >
          다음
        </Button>
      </div>
    </>
  );
};

const Step4 = ({ onBack, onNext }) => (
  <>
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "95%",
        display: "flex",
        bottom: 10,
        justifyContent: "space-between",
      }}
    >
      <Button
        onClick={onBack}
        variant="contained"
        color="secondary"
        style={{ width: "35%", left: 10 }}
      >
        이전
      </Button>
      <Button
        onClick={onNext}
        variant="contained"
        color="secondary"
        style={{ width: "55%" }}
      >
        다음
      </Button>
    </div>
  </>
);

const Step5 = ({ onBack, onNext }) => (
  <>
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "95%",
        display: "flex",
        bottom: 10,
        justifyContent: "space-between",
      }}
    >
      <Button
        onClick={onBack}
        variant="contained"
        color="secondary"
        style={{ width: "35%", left: 10 }}
      >
        이전
      </Button>
      <Button
        onClick={onNext}
        variant="contained"
        color="secondary"
        style={{ width: "55%" }}
      >
        다음
      </Button>
    </div>
  </>
);

const Step6 = ({}) => (
  <>
    <div>
      <Typography variant="h5">어떤 모임을 만들까요 ?</Typography>
      {/* Step 1 내용 및 이벤트 처리 */}
      <Button variant="contained" color="secondary" style={fixedButtonStyle}>
        확인
      </Button>
    </div>
  </>
);

const AddClub = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      {activeStep === 0 && <SetCategory onNext={handleNext} />}
      {activeStep === 1 && (
        <SetDetail onBack={handleBack} onNext={handleNext} />
      )}
      {activeStep === 2 && (
        <SetMaxCapacity onBack={handleBack} onNext={handleNext} />
      )}
      {activeStep === 3 && (
        <SetMaxCapacity onBack={handleBack} onNext={handleNext} />
      )}
      {activeStep === 4 && (
        <SetMaxCapacity onBack={handleBack} onNext={handleNext} />
      )}
      {activeStep === 5 && <SetMaxCapacity onBack={handleBack} />}
    </div>
  );
};

export default AddClub;

const fixedButtonStyle = {
  position: "fixed",
  bottom: 10,
  left: 20,
  width: "90%",
  padding: "5px",
  textAlign: "center",
};
