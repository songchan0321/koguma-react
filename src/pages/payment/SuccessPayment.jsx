import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import TopBar from "../../component/payment/TopBar";
import Page404 from "../common/Page404";
import { useEffect, useState } from "react";
import { chargePointAPI } from "../../apis/api/payment";
import { Box, Button, Container, Typography } from "@mui/material";
import { getMemberAPI } from "../../apis/api/member";
import { getPaymentAPIService } from "../../apis/services/payment";
import LoadingProgress from "../../component/common/LoadingProgress";
import MarginEmpty from "../../component/payment/MarginEmpty";

const SuccessPayment = () => {
  //   const navigator = useNavigate();
  const { type } = useParams();
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const imp_uid = searchParams.get("imp_uid");
  const merchant_uid = searchParams.get("merchant_uid");
  const roomId = searchParams.get("roomId");
  const point = searchParams.get("point");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);
  const [data, setData] = useState("");
  useEffect(() => {
    setLoading(true);
    if (type === "charge") {
      (async () => {
        try {
          await chargePointAPI(imp_uid, merchant_uid)
            .then(() => getMemberAPI())
            .then(getPaymentAPIService)
            .then(({ balance }) => {
              setBalance(balance);
              setData("충전이 완료되었습니다.");
              setLoading(false);
            });
        } catch ({ error }) {
          console.log(error);
          setLoading(false);
          alert(error);
          navigator("/payment/charge");
        }
      })();
    } else if (type === "refund") {
      (async () => {
        await getMemberAPI()
          .then(getPaymentAPIService)
          .then(({ balance }) => {
            setBalance(balance);
            setData("환급 요청이 완료되었습니다.");
            setLoading(false);
          });
      })();
    } else if (type === "transfer") {
      (async () => {
        await getMemberAPI()
          .then(getPaymentAPIService)
          .then(({ balance }) => {
            setBalance(balance);
            setData("송금이 완료되었습니다.");
            setLoading(false);
          });
      })();
    }
    setLoading(false);
  }, [type, imp_uid, merchant_uid]);
  if (!["charge", "transfer", "refund"].includes(type)) {
    return <Page404 />;
  }
  return (
    <Container fixed>
      {loading ? (
        <LoadingProgress />
      ) : (
        <>
          <TopBar>
            {{ charge: "충전", transfer: "송금", refund: "환급 요청" }[type]}
          </TopBar>
          <MarginEmpty value={"70px"} />
          <Typography
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", mb: 1.5 }}
          >
            {data}
          </Typography>
          {balance && (
            <Typography
              variant="h6"
              component="h2"
              sx={{
                textAlign: "center",
                mb: 1.5,
                fontSize: "small",
                color: "gray",
              }}
            >
              고구마 포인트 잔액: {balance}
            </Typography>
          )}
          <Box sx={{ textAlign: "center" }}>
            <Button
              //   disabled={point <= 0 || point >= 3000000}
              sx={{ mt: 1, backgroundColor: "#D070FB" }}
              size="large"
              variant="contained"
              // color="secondary"
              onClick={
                type === "transfer"
                  ? () => navigator(`/chat/get/${roomId}`)
                  : () => navigator("/payment/get")
              }
            >
              완료
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default SuccessPayment;
