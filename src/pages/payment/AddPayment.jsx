import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useState } from "react";
import LoadingProgress from "../../component/common/LoadingProgress";
import PaymentForm from "../../component/payment/PaymentForm";

const AddPayment = () => {
  const [existPayment, setExistPayment] = useState(false);
  return (
    <Container fixed>
      <Typography
        variant="h6"
        // color="secondary"
        component="h2"
        sx={{ textAlign: "center", mb: 1.5, mt: 1.0 }}
      >
        고구마 페이 생성
      </Typography>
      <PaymentForm />
    </Container>
  );
};

export default AddPayment;
