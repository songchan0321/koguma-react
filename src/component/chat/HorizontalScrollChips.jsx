import { Chip, Paper } from "@mui/material";

const HorizontalScrollChips = ({ newSendTextMessageHandler, product }) => {
  const chipContainerStyle = {
    display: "flex",
    overflowX: "auto",
    padding: "16px", // Adjust as needed
    maxWidth: "100%", // Ensure the container can scroll
    position: "fixed",
    bottom: 54,
  };

  const chipStyle = {
    margin: "6px", // Adjust as needed
  };

  const items = [
    "상품 구매를 원해요!",
    "상품 정보를 더 얻고 싶어요!",
    "직거래 장소가 궁금해요!",
  ];

  return (
    <Paper elevation={0} style={chipContainerStyle}>
      {items.map((item, index) => (
        <Chip
          key={index}
          label={item}
          variant="outlined"
          style={chipStyle}
          onClick={() => newSendTextMessageHandler(item, product)}
          // Add other Chip props as needed
        />
      ))}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </Paper>
  );
};

export default HorizontalScrollChips;
