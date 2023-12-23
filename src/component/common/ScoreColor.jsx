import { IconButton, Typography, createTheme } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
import { linearProgressClasses } from "@mui/joy";
import { red } from "@mui/material/colors";

const theme = createTheme();
const ScoreColor = ({ score }) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 5,
    backgroundColor: "lightgrey",
  }));
  let textColor;

  // Score에 따라 적절한 색상 설정
  if (score <= 36.0) {
    textColor = "info"; // 파란색
  } else if (score > 36.0 && score <= 42.0) {
    textColor = "success"; // 초록색
  } else if (score > 42.0 && score <= 50.0) {
    textColor = "warning"; // 노란색
  } else {
    textColor = "error"; // 빨간색
  }

  return (
    <>
      <IconButton aria-label="settings">
        <Typography
          variant="body1"
          sx={{ color: theme.palette[textColor].main }}
        >
          {score}℃
          <BorderLinearProgress
            color={textColor}
            variant="determinate"
            value={(score / 100) * 100}
          />
        </Typography>
      </IconButton>

      <ThermostatIcon />
    </>
  );
};
export default ScoreColor;
