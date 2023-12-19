import { Typography } from "@mui/material";
import Back from "./Back";

const TopBarClub = ({ children, color = "none" }) => {
  return (
    <Typography
      variant="h6"
      color={color}
      // ...option
      component="h2"
      sx={{ textAlign: "center", mb: 1.5 }}
    >
      <Back />
      {/* <i>Pay</i> */}
      {children}
    </Typography>
  );
};

export default TopBarClub;
