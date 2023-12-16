import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getMemberAPI } from "../../apis/api/member";
import LoadingProgress from "../../component/common/LoadingProgress";
import TopBar from "../../component/payment/TopBar";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import MarginEmpty from "../../component/payment/MarginEmpty";
import Back from "../../component/common/Back";
import { requestRefundPointAPI } from "../../apis/api/payment";

const RequestRefundPoint = () => {
  const navigator = useNavigate();
  const [balance, setBalance] = useState(null);
  const [point, setPoint] = useState(0);
  const [pointString, setPointString] = useState("");
  useEffect(() => {
    (async () => {
      await getMemberAPI()
        .then((data) => setBalance(Number(data.paymentBalance)))
        .catch((err) => console.log(err));
    })();
  }, []);

  const pointInputHandler = (event) => {
    const { value } = event.target;
    const replaceValue =
      pointString.length < value.length
        ? value.replaceAll("원", "").replace(/,/g, "")
        : value.substring(0, value.length - 1).replace(/,/g, "");
    // if (point.length === 2 && value.length === 1) {
    //   setPoint("");
    //   return;
    // }
    // const replaceValue = value.replaceAll("원", "").replace(/,/g, "");
    // value.replace(/,/g, '');
    const onlyNumbersPattern = /^\d+$/; // 숫자만 허용하는 정규식

    if (value.length > 1 && !onlyNumbersPattern.test(replaceValue)) {
      return; // 숫자가 아닌 경우에는 더 이상 진행하지 않음
    }
    // if(value !== "" && )
    setPoint(Number(replaceValue));
    setPointString(Number(replaceValue).toLocaleString("ko-KR") + "원");
  };

  const buttonClickHandler = () => {
    (async () => {
      try {
        await requestRefundPointAPI(point);
        navigator("/success/refund");
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return (
    <Container fixed>
      <TopBar>환급하기</TopBar>
      <Back />
      <MarginEmpty value={"70px"} />
      {balance === null ? (
        <LoadingProgress />
      ) : (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              //   width: "90%",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            name="point"
            value={pointString}
            onChange={pointInputHandler}
            color="secondary"
            error={balance - point < 0}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            label="환급 요청할 금액을 입력해주세요"
            helperText={
              point <= 0
                ? `고구마 포인트 잔액: ${
                    balance.toLocaleString("ko-KR") + "원"
                  }`
                : balance - point < 0
                ? `환급은 0원 이상할 수 있어요...`
                : `환급 후 잔액: ${
                    (balance - point).toLocaleString("ko-KR") + "원"
                  }`
            }
          />
          <Box sx={{ textAlign: "center" }}>
            <Button
              disabled={balance - point < 0 || point <= 0}
              sx={{ mt: 1 }}
              size="large"
              variant="contained"
              color="secondary"
              onClick={buttonClickHandler}
            >
              환급하기
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default RequestRefundPoint;
