import { Card, CardContent, Stack, Typography } from "@mui/material";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import EmergencyShareOutlinedIcon from "@mui/icons-material/EmergencyShareOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
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
const LandingChat = () => {
  return (
    <Card
      sx={{
        minWidth: 275,
        backgroundColor: "#FFF8F1",
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
          채팅
        </Typography>
        <Typography
          sx={{ width: "20rem", textAlign: "center", mt: "1rem" }}
          variant="h5"
          component="div"
        >
          이웃간 소통을 위한
          <br />
          채팅 시스템
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
            <ScheduleSendOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>약속 잡기</Typography>
          </ItemStack>
          <ItemStack>
            <EmergencyShareOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>장소 공유</Typography>
          </ItemStack>
          <ItemStack>
            <CurrencyExchangeOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>송금</Typography>
          </ItemStack>
          <ItemStack>
            <NotificationsActiveOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>실시간 알림</Typography>
          </ItemStack>
        </div>
      </CardContent>
    </Card>
  );
};

export default LandingChat;
