import { Alert } from "@mui/material";

const AlertBubble = ({ contetnt }) => {
  return (
    <Alert
      variant="standard"
      severity="info"
      sx={{ width: "100%", borderRadius: 0 }}
    >
      {contetnt}
    </Alert>
  );
};

export default AlertBubble;
