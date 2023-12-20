import { Card, CardContent, Stack, Typography } from "@mui/material";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import ConnectWithoutContactOutlinedIcon from "@mui/icons-material/ConnectWithoutContactOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
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
const LandingClub = () => {
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
          모임
        </Typography>
        <Typography
          sx={{ width: "20rem", textAlign: "center", mt: "1rem" }}
          variant="h5"
          component="div"
        >
          이웃과 함께하는
          <br />
          취미생활 모임
        </Typography>
        <Typography
          sx={{ textAlign: "center", mt: "1.2rem" }}
          color="text.secondary"
        >
          이웃끼리 만나서
          <br />
          서로의 경험을 공유해요.
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2.5rem",
          }}
        >
          <ItemStack>
            <InsertInvitationOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>만남 약속</Typography>
          </ItemStack>
          <ItemStack>
            <ConnectWithoutContactOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>채팅방</Typography>
          </ItemStack>
          <ItemStack>
            <AssignmentOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>모임 게시판</Typography>
          </ItemStack>
        </div>
      </CardContent>
    </Card>
  );
};

export default LandingClub;
