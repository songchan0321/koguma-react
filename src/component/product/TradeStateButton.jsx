import { Button } from "@mui/material";

const TradeStateButton = ({ type }) => {
  const tradeStatus = type && type.tradeStatus; // Extract tradeStatus from the object

  if (tradeStatus === "RESERVATION") {
    return (
      <Button color="success" variant="contained" size="small">
        예약중
      </Button>
    );
  } else if (tradeStatus === "SALED") {
    return (
      <Button color="secondary" variant="contained" size="small">
        판매완료
      </Button>
    );
  } else if (tradeStatus === "BUY") {
    return (
      <Button color="secondary" variant="contained" size="small">
        구매완료
      </Button>
    );
  }

  // Default case or unknown type
  return null;
};

export default TradeStateButton;
