import { Box, CircularProgress, Container } from "@mui/material";
import PaymentInfo from "../../component/payment/PaymentInfo";
import TopBar from "../../component/payment/TopBar";
import { useEffect, useState } from "react";
import { existPaymentAPI } from "../../apis/api/payment";
import { getMemberAPI } from "../../apis/api/member";

const GetPayment = () => {
  const [existPayment, setExistPayment] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      await existPaymentAPI(3)
        .then(({ result }) => {
          setExistPayment(result);
          return result;
        })
        .then((result) => {
          if (result) {
            (async () => {
              await getMemberAPI(3)
                .then((data) => console.log(data))
                .catch((err) => console.log(err));
            })();
          }
        })
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
