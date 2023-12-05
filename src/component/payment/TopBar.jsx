import { Typography } from "@mui/material";

const TopBar = () => {
  return (
    <Typography
      variant="h6"
      color="secondary"
      component="h2"
      sx={{ textAlign: "center", mb: 1.5 }}
    >
      <i>Pay</i>
    </Typography>
  );
};

export default TopBar;
