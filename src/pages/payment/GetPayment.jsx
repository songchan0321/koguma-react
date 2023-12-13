import { Box, Button, CircularProgress, Container } from "@mui/material";
import PaymentInfo from "../../component/payment/PaymentInfo";
import TopBar from "../../component/payment/TopBar";
import { useContext, useEffect, useState } from "react";
import { existPaymentAPI } from "../../apis/api/payment";
import { getMemberAPI } from "../../apis/api/member";
import { useNavigate } from "react-router-dom";
import LoadingProgress from "../../component/common/LoadingProgress";
import { IsLoginContext } from "../../context/LoginContextProvider";

const GetPayment = () => {
  const { setIsLogin } = useContext(IsLoginContext);
  const [existPayment, setExistPayment] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await existPaymentAPI().then(({ result }) => {
          setExistPayment(result);
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <Container fixed>
      {loading ? (
        <LoadingProgress />
      ) : (
        <>
          <TopBar color="secondary">
            <i>Pay</i>
          </TopBar>
          <PaymentInfo registered={existPayment} />
        </>
      )}
    </Container>
  );
};

export default GetPayment;
