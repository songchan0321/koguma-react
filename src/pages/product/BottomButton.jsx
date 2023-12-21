import { Button } from "@mui/material";

const BottomButton = ({ navTarget, child, isBlock }) => {
  return (
    <Button
      color="secondary"
      variant="outlined"
      size="small"
      onClick={navTarget}
      disabled={!isBlock}
    >
      {child}
    </Button>
  );
};

export default BottomButton;
