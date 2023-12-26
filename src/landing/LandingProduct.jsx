import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
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
const LandingProduct = () => {
  return (
    <Card
      sx={{
        minWidth: 275,
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // pb: "1.5rem",
        //   justifyContent: "center",
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
          중고 거래
        </Typography>
        <Typography
          sx={{ width: "20rem", textAlign: "center", mt: "1rem" }}
          variant="h5"
          component="div"
        >
          믿을만한
          <br />
          이웃 간 중고거래
        </Typography>
        <Typography
          sx={{ textAlign: "center", mt: "1.2rem" }}
          color="text.secondary"
        >
          마을 주민들과 가깝고 따뜻한 거래를
          <br />
          지금 경험해보세요.
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2.5rem",
          }}
        >
          <ItemStack>
            <AddShoppingCartOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>관심 상품</Typography>
          </ItemStack>
          <ItemStack>
            <ShoppingCartCheckoutOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>가격 제안</Typography>
          </ItemStack>
          <ItemStack>
            <RateReviewOutlinedIcon sx={{ fontSize: "2.0rem" }} />
            <Typography sx={{ fontSize: "0.8rem" }}>후기</Typography>
          </ItemStack>
        </div>
      </CardContent>
      <CardMedia
        component="img"
        height="320"
        image="landing/productlist.png"
        // alt={"alt"}
        // title={"titleasdasdsada"}
        sx={{
          // padding: "1em 1em 0 1em",
          // borderRadius: "17rem",

          objectFit: "contain",
        }}
      />
    </Card>
  );
};

export default LandingProduct;
