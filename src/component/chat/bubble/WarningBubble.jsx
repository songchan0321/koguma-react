import { Alert } from "@mui/material";

const WarningBubble = ({ contetnt }) => {
  return (
    <Alert
      variant="standard"
      severity="error"
      sx={{ width: "18rem", borderRadius: 0, p: "1.2rem" }}
    >
      {contetnt}
    </Alert>
  );
};

export default WarningBubble;
