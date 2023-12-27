import { Button } from "@mui/material";

const BottomButton = ({ navTarget, child, isBlock }) => {
  return (
    <Button
      color="secondary"
      variant={child === "채팅하기" ? "contained" : "outlined"}
      size="small"
      sx={{
        width: "6.5rem",
        fontSize: "0.7rem",
        p: "0.4rem 0",
        backgroundColor: child === "채팅하기" && "#D070FB",
      }}
      onClick={navTarget}
      disabled={!isBlock}
    >
      {child}
    </Button>
  );
};

export default BottomButton;
