import { Container } from "@mui/material";
import PaymentInfo from "../../component/payment/PaymentInfo";
import TopBar from "../../component/payment/TopBar";

const ListPaymentHistory = () => {
  return (
    <Container fixed>
      <TopBar />
      <PaymentInfo />
    </Container>
  );
};

export default ListPaymentHistory;
