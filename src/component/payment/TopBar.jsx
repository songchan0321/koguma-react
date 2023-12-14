import { AppBar, Toolbar, Typography } from "@mui/material";
import Back from "../common/Back";

const TopBar = ({ children, color }) => {
  return (
    <>
      {/* <Back /> */}
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "#f0f0f0",
          zIndex: 1000,
        }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h6"
            component="div"
            color={color ? color : "black"}
            // sx={{ color: color ? color : "black" }}
          >
            {children}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopBar;
