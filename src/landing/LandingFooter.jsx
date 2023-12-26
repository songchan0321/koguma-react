import { Card, CardContent, Typography } from "@mui/material";

const LandingFooter = () => {
  return (
    <Card
      sx={{
        minWidth: 275,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: "1rem",
        pb: "1rem",
      }}
    >
      <CardContent sx={{ pb: "3rem" }}>
        <Typography
          sx={{ textAlign: "center", mt: "1.2rem" }}
          color="text.secondary"
        >
          저희 웹 페이지는 상업적인 목적이 없는
          <br />
          교육용 웹 페이지입니다.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LandingFooter;
