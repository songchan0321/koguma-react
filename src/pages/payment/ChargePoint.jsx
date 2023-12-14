import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getMemberAPI } from "../../apis/api/member";
import LoadingProgress from "../../component/common/LoadingProgress";
import TopBar from "../../component/payment/TopBar";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import MarginEmpty from "../../component/payment/MarginEmpty";
import Back from "../../component/common/Back";

const ChargePoint = () => {
  const navigator = useNavigate();
  const [balance, setBalance] = useState(null);
  const [point, setPoint] = useState(0);
  const [nickname, setNickname] = useState(null);
  const [pointString, setPointString] = useState("");
  useEffect(() => {
    (async () => {
      await getMemberAPI()
        .then((data) => {
          setNickname(data.nickname);
          return data;
        })
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
    const IMP = window.IMP;
    const makeMerchantUid = uuid();
    console.log(makeMerchantUid);
    IMP.init(process.env.REACT_APP_IMP_ID);
    IMP.request_pay(
      {
        pg: "kakaopay.TC0ONETIME",
        pay_method: "trans",
        merchant_uid: `${makeMerchantUid}`, //상점에서 생성한 고유 주문번호 (임시로 시간으로...)
        name: "고구마 포인트 충전",
        amount: point,
        buyer_name: nickname,
        m_redirect_url: process.env.REACT_APP_KAKAO_PAY_REDIRECT_URL,
      },
      function (rsp) {
        if (!rsp.success) {
          //결제 시작 페이지로 리디렉션되기 전에 오류가 난 경우
          var msg = "오류로 인하여 결제가 시작되지 못하였습니다.";
          msg += "에러내용 : " + rsp.error_msg;
          alert(msg);
        } else {
          navigator(
            `/payment/success/charge?imp_uid=${rsp.imp_uid}&merchant_uid=${rsp.merchant_uid}&imp_success=true`
          );
        }
      }
    );
  };

  return (
    <Container fixed>
      <TopBar>충전하기</TopBar>
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
            error={point >= 3000000}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            label="충전할 금액을 입력해주세요"
            helperText={
              point <= 0
                ? `고구마 포인트 잔액: ${
                    balance.toLocaleString("ko-KR") + "원"
                  }`
                : point >= 3000000
                ? `충전은 3,000,000원 이상할 수 없어요...`
                : `충전 후 잔액: ${
                    (balance + point).toLocaleString("ko-KR") + "원"
                  }`
            }
          />
          <Box sx={{ textAlign: "center" }}>
            <Button
              disabled={point <= 0 || point >= 3000000}
              sx={{ mt: 1 }}
              size="large"
              variant="contained"
              color="secondary"
              onClick={buttonClickHandler}
            >
              충전하기
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default ChargePoint;
