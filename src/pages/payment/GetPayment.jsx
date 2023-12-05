import { Box, CircularProgress, Container } from "@mui/material";
import PaymentInfo from "../../component/payment/PaymentInfo";
import TopBar from "../../component/payment/TopBar";
import { useEffect, useState } from "react";
import { existPaymentAPI } from "../../apis/api/payment";

const GetPayment = () => {
  const [existPayment, setExistPayment] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      await existPaymentAPI()
        .then(({ result }) => setExistPayment(result))
        .then(() => setLoading(false))
        .catch((err) => console.log(err));
    })();
  }, []);
  return (
    <Container fixed>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <>
          <TopBar />
          <PaymentInfo registered={existPayment} />
        </>
      )}
    </Container>
  );
};

export default GetPayment;
