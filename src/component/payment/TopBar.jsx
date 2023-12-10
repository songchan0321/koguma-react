import { Typography } from "@mui/material";

const TopBar = ({ children, color = "none" }) => {
  return (
    <Typography
      variant="h6"
      color={color}
      // ...option
      component="h2"
      sx={{ textAlign: "center", mb: 1.5 }}
    >
      {/* <i>Pay</i> */}
      {children}
    </Typography>
  );
};

export default TopBar;
