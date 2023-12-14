import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useState } from "react";
import LoadingProgress from "../../component/common/LoadingProgress";
import PaymentForm from "../../component/payment/PaymentForm";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";

const AddPayment = () => {
  const [existPayment, setExistPayment] = useState(false);
  return (
    <Container fixed>
      <TopBar>고구마 페이 생성</TopBar>
      <MarginEmpty value={"65px"} />
      <PaymentForm />
    </Container>
  );
};

export default AddPayment;
