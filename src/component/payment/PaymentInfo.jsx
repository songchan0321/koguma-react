import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { CardHeader, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const UnregistedPaymentCard = () => {
  return (
    <React.Fragment>
      <CardContent sx={{ mt: 0.3 }}>
        <Typography variant="h5" component="div">
          고구마 페이가 등록되어 있지 않습니다.
        </Typography>
        <Typography sx={{ mb: 0.6 }} color="text.secondary">
          페이를 사용하려면 등록해주세요!
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", mb: 2.0 }}>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/payment/add"
        >
          등록 하러가기
        </Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </React.Fragment>
  );
};
const PaymentCard = () => {
  const [payment, setPayment] = React.useState({});
  return (
    <React.Fragment>
      <CardContent sx={{ mt: 0.3 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          고구마 포인트
        </Typography>
        <Typography variant="h5" component="div">
          1,000원
          {/* 데이터로 받아야함 멤버 */}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-around", mb: 2.0 }}>
        <Button variant="contained" color="secondary" size="large">
          <AddIcon />
          &nbsp;충전
        </Button>
        <Button variant="contained" color="secondary" size="large">
          환급 요청
        </Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </React.Fragment>
  );
};
<DeleteIcon
  color="warning"
  sx={{
    position: "relative",
    right: "0",
  }}
/>;
const PaymentInfo = ({ registered }) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        sx={{ backgroundColor: "#e9ecef", position: "relative" }}
        variant="outlined"
      >
        {registered && (
          <IconButton
            sx={{ position: "absolute", top: "10px", right: "10px" }}
            aria-label="delete"
          >
            <DeleteIcon color="warning" />
          </IconButton>
        )}

        {!registered ? <UnregistedPaymentCard /> : <PaymentCard />}
      </Card>
    </Box>
  );
};

export default PaymentInfo;
