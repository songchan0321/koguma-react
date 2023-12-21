import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { getMemberAPI } from "../../apis/api/member";
import { getPaymentAPIService } from "../../apis/services/payment";

const UnregistedPaymentCard = () => {
  return (
    <Fragment>
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
          // color="secondary"
          sx={{ backgroundColor: "#D070FB" }}
          component={Link}
          to="/payment/add"
        >
          등록 하러가기
        </Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Fragment>
  );
};
const PaymentCard = () => {
  const [payment, setPayment] = useState({});
  // const [member, setMember] = useState({});
  useEffect(() => {
    (async () => {
      await getMemberAPI(3)
        .then(getPaymentAPIService)
        .then((data) => setPayment(data))
        .catch((err) => console.log(err));
    })();
  }, []);
  return (
    <Fragment>
      <CardContent sx={{ mt: 0.3 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          고구마 포인트
        </Typography>
        <Typography variant="h5" component="div">
          {payment.balance}
          {/* 1,000원 */}
          {/* 데이터로 받아야함 멤버 */}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-around", mb: 2.0 }}>
        <Button
          variant="contained"
          // color="secondary"
          sx={{ backgroundColor: "#D070FB" }}
          size="large"
          component={Link}
          to="/payment/charge"
        >
          <AddIcon />
          &nbsp;충전
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#D070FB" }}
          size="large"
          component={Link}
          to="/payment/requestRefund"
        >
          환급 요청
        </Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Fragment>
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
  const navigator = useNavigate();
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
            onClick={() => navigator("/payment/delete")}
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
