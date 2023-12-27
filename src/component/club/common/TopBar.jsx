import { AppBar, Divider, Toolbar, Typography } from "@mui/material";

const TopBar = ({ children, color }) => {
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
            {/* <i>Pay</i> */}
            {children}
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider style={{ backgroundColor: "gray", height: 2 }} />
    </>
  );
};

export default TopBar;
