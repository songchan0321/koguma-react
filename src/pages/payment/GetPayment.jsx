import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  ListItem,
  Paper,
  Stack,
} from "@mui/material";
import PaymentInfo from "../../component/payment/PaymentInfo";
import TopBar from "../../component/payment/TopBar";
import { useContext, useEffect, useState } from "react";
import { existPaymentAPI } from "../../apis/api/payment";
import { getMemberAPI } from "../../apis/api/member";
import { useNavigate } from "react-router-dom";
import LoadingProgress from "../../component/common/LoadingProgress";
import { IsLoginContext } from "../../context/LoginContextProvider";
import MarginEmpty from "../../component/payment/MarginEmpty";
import ListPaymentHistory from "../../component/payment/ListPaymentHistory";
import Back from "../../component/common/Back";

const GetPayment = () => {
  const { setIsLogin } = useContext(IsLoginContext);
  const [type, setType] = useState("ALL");
  const [existPayment, setExistPayment] = useState(false);
  const [loading, setLoading] = useState(true);
  const typeList = [
    { key: 0, label: "전체", type: "ALL" },
    { key: 1, label: "송금", type: "TRANSFER" },
    { key: 2, label: "충전", type: "CHARGE" },
    { key: 3, label: "환급", type: "REFUND" },
  ];
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
          <Back url={"/"} />
          <MarginEmpty value={"70px"} />
          <PaymentInfo registered={existPayment} />
          <br />
          {existPayment && (
            <>
              <Stack direction="row" spacing={3}>
                {typeList.map((t) => {
                  return (
                    <Chip
                      key={t.key}
                      label={t.label}
                      onClick={() => setType(t.type)}
                      variant={type !== t.type ? "outlined" : ""}
                    />
                  );
                })}
                {/* <Chip label="Small" size="small" />
                <Chip label="Small" size="small" variant="outlined" /> */}
              </Stack>
              <ListPaymentHistory type={type} />
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default GetPayment;
