import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LandingProduct from "./landing/LandingProduct";
import LandingChat from "./landing/LadingChat";
import LandingMember from "./landing/LandingMember";
import LandingPayment from "./landing/LandingPayment";
import LandingCommunity from "./landing/LandingCommunity";
import LandingClub from "./landing/LandingClub";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          backgroundColor: "#E4BBFE",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pb: "1.5rem",
        }}
      >
        <CardContent>
          <Typography
            sx={{ maxWidth: "15rem", textAlign: "center", mt: "1.5rem" }}
            variant="h5"
            component="div"
          >
            고민말고
            <br />
            구하세요 마을에서
          </Typography>
          <Typography
            sx={{ textAlign: "center", mt: "1.2rem" }}
            color="text.secondary"
          >
            마을에서 가능한 모든 것<br />
            고구마에서 마을 이웃과 함께해요
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#4AD395" }}
            size="small"
            component={Link}
            to="/product/list"
          >
            고구마 이용하기
          </Button>
        </CardActions>
      </Card>
      <LandingMember />
      <LandingProduct />
      <LandingChat />
      <LandingPayment />
      <LandingCommunity />
      <LandingClub />
    </>
  );
};

export default Landing;
