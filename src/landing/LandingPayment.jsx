import { Card, CardContent, Stack, Typography } from "@mui/material";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PriceCheckOutlinedIcon from "@mui/icons-material/PriceCheckOutlined";
const ItemStack = ({ children }) => {
  return (
    <Stack
      spacing={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {children}
    </Stack>
  );
};
const LandingPayment = () => {
  return (
    <Card
      sx={{
        minWidth: 275,
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: "1.5rem",
        //   justifyContent: "center",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, textAlign: "center", color: "#FF6F0F" }}
          color="text.secondary"
          gutterBottom
        >
          페이
        </Typography>
        <Typography
          sx={{ width: "20rem", textAlign: "center", mt: "1rem" }}
          variant="h5"
          component="div"
        >
          안전한 거래를 위한
          <br />
          고구마 페이
        </Typography>
        <Typography
          sx={{ textAlign: "center", mt: "1.2rem" }}
          color="text.secondary"
        >
          이웃간의 의사소통과
          <br />
          안전한 송금까지 경험해보세요.
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2.5rem",
          }}
        >
          <ItemStack>
            <AddCardOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>계좌 인증</Typography>
          </ItemStack>
          <ItemStack>
            <MonetizationOnOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>충전</Typography>
          </ItemStack>
          <ItemStack>
            <PriceCheckOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>환급</Typography>
          </ItemStack>
        </div>
      </CardContent>
    </Card>
  );
};

export default LandingPayment;
