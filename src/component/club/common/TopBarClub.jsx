import { AppBar, Divider, Toolbar, Typography } from "@mui/material";
import Back from "./Back";

const TopBarClub = ({ children, color }) => {
  return (
    <>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "white",
          zIndex: 1000,
          boxShadow: "none", // 그림자 없애기
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            color={color ? color : "black"}
          >
            <Back url={children} />
            {children}
            {/* <i>Pay</i> */}
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider style={{ backgroundColor: "gray", height: 2 }} />
    </>
  );
};

export default TopBarClub;
