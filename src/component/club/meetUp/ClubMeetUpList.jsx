import { useEffect, useState } from "react";
import { listMeetUpAPI } from "../../../apis/api/club";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Grid,
  MobileStepper,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClubMeetUpList = ({ clubId, meetUpState, clubMember }) => {
  const [meetUpList, setMeetUpList] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listMeetUpAPI(clubId, meetUpState);
        setMeetUpList(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId, meetUpState]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, meetUpList.length - 1)
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const formatMonth = (dateString) => {
    const options = { month: "long" };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
  };

  const formatDay = (dateString) => {
    const options = { day: "numeric" };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(dateString).toLocaleTimeString("ko-KR", options);
  };
  return (
    <>
      {clubMember.activeFlag ? (
        <div>
          {meetUpList.length > 0 && (
            <div
              onClick={() =>
                navigate(`/club/meet-up/${meetUpList[activeStep].id}`, {
                  state: { clubId: clubId },
                })
              }
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      "& > :not(style)": {
                        m: 1,
                        width: 50,
                        height: 50,
                      },
                    }}
                  >
                    <Paper
                      style={{
                        textAlign: "center",
                        marginTop: "20px",
                        marginRight: "3px",
                      }}
                    >
                      <Typography variant="body1">
                        {formatMonth(meetUpList[activeStep].meetDate)}
                      </Typography>

                      <Typography variant="h6">
                        {formatDay(meetUpList[activeStep].meetDate)}
                      </Typography>
                      <br />
                      <br />
                    </Paper>
                  </Box>
                </Grid>
                <Card style={{ marginTop: "30px", boxShadow: "none" }}>
                  <Typography>{meetUpList[activeStep].title}</Typography>

                  {meetUpList[activeStep].meetUpType === "SCHEDULE" ? (
                    <Typography variant="caption" color={"#D070FB"}>
                      스캐줄
                    </Typography>
                  ) : (
                    <Typography variant="caption" color={"#616161"}>
                      종료
                    </Typography>
                  )}

                  <Typography variant="body2">
                    {formatTime(meetUpList[activeStep].meetDate)}
                  </Typography>
                </Card>
              </Grid>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      <div>
        {/* MobileStepper for navigation */}
        <MobileStepper
          variant="dots"
          steps={meetUpList.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === meetUpList.length - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </div>
    </>
  );
};

export default ClubMeetUpList;
