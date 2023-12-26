import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import SecurityUpdateGoodOutlinedIcon from "@mui/icons-material/SecurityUpdateGoodOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
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
const LandingMember = () => {
  return (
    <Card
      sx={{
        minWidth: 275,
        backgroundColor: "#FFFAE0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardContent sx={{ pb: "3rem" }}>
        <Typography
          sx={{
            fontSize: 14,
            textAlign: "center",
            color: "#FF6F0F",
            pt: "1.5rem",
          }}
          color="text.secondary"
          gutterBottom
        >
          이웃
        </Typography>
        <Typography
          sx={{ width: "20rem", textAlign: "center", mt: "1rem" }}
          variant="h5"
          component="div"
        >
          지역 인증
          <br />
          고구마 이웃
        </Typography>
        <Typography
          sx={{ textAlign: "center", mt: "1.2rem" }}
          color="text.secondary"
        >
          마을 주민과 이웃이 되어
          <br />
          고구마를 이용해보세요.
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2.5rem",
          }}
        >
          <ItemStack>
            <SecurityUpdateGoodOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>문자 인증</Typography>
          </ItemStack>
          <ItemStack>
            <AddLocationAltOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>지역 추가</Typography>
          </ItemStack>
          <ItemStack>
            <PersonAddAltOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>팔로잉</Typography>
          </ItemStack>
          <ItemStack>
            <PersonOffOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>차단</Typography>
          </ItemStack>
        </div>
      </CardContent>
      <CardMedia
        component="img"
        height="320"
        image="landing/profile.png"
        sx={{
          objectFit: "contain",
          // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      />
    </Card>
  );
};

export default LandingMember;
