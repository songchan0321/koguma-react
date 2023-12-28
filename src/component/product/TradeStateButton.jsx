import { Button } from "@mui/material";

const TradeStateButton = ({ type }) => {
  const tradeStatus = type && type.tradeStatus; // Extract tradeStatus from the object
  const style = {
    mr: 1,
    // width: "4rem",
    display: "inline-block",
    padding: 0,
    minHeight: 0,
    minWidth: "3rem",
  };
  if (tradeStatus === "RESERVATION") {
    return (
      <Button
        color="success"
        variant="contained"
        sx={style}
        style={{
          fontSize: "9px",
          height: "24px",
          width: "30px",
        }}
      >
        예약중
      </Button>
    );
  } else if (tradeStatus === "SALED") {
    return (
      <Button
        color="secondary"
        variant="contained"
        sx={style}
        style={{
          fontSize: "9px",
          height: "24px",
          width: "30px",
        }}
      >
        판매완료
      </Button>
    );
  } else if (tradeStatus === "BUY") {
    return (
      <Button
        color="secondary"
        variant="contained"
        sx={style}
        style={{
          fontSize: "9px",
          height: "24px",
          width: "30px",
        }}
      >
        구매완료
      </Button>
    );
  }

  // Default case or unknown type
  return null;
};

export default TradeStateButton;
