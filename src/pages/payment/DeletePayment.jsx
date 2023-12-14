import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../../component/payment/TopBar";
import Back from "../../component/common/Back";
import MarginEmpty from "../../component/payment/MarginEmpty";
import GetPayment from "./GetPayment";
import LoadingProgress from "../../component/common/LoadingProgress";
import { getMemberAPI } from "../../apis/api/member";
import { getPaymentAPIService } from "../../apis/services/payment";
import {
  checkPaymentPasswordAPI,
  deletePaymentAPI,
} from "../../apis/api/payment";

const DeletePayment = () => {
  const navigator = useNavigate();
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setPassword(null);
    setError("");
  };
  const deletePaymentHandler = () => {
    const balance = parseInt(
      payment.balance.replace("원", "").replace(/,/g, "")
    );
    if (balance !== 0) {
      alert("잔액을 환급한 뒤 삭제해주세요.");
      return;
    }
    (async () => {
      const data = await checkPaymentPasswordAPI(password);
      if (data.result) {
        const data = await deletePaymentAPI(password);
        if (data.result) {
          alert("삭제 완료");
          navigator("/member/profile");
        } else {
          alert("알수 없는 오류");
        }
      } else {
        setError("비밀번호가 일치하지 않습니다!");
      }
    })();
  };
  useEffect(() => {
    (async () => {
      await getMemberAPI().then(getPaymentAPIService).then(setPayment);
    })();
  }, []);
  return (
    <Container fixed>
      {!payment ? (
        <LoadingProgress />
      ) : (
        <>
          <TopBar color="secondary">
            <i>Pay</i>
          </TopBar>
          <Back />
          <MarginEmpty value={"70px"} />
          <Box sx={{ minWidth: 275 }}>
            <Card
              sx={{ backgroundColor: "#e9ecef", position: "relative" }}
              variant="outlined"
            >
              <Fragment>
                <CardContent sx={{ mt: 0.3 }}>
                  <Typography variant="h5" component="div">
                    페이를 정말로 삭제하겠습니까?
                  </Typography>
                  <br />
                  <Typography
                    //   sx={{ mb: 0.6 }}
                    variant="subtitle1"
                    color="text.first"
                  >
                    페이에 남은 포인트가{" "}
                    <span style={{ color: "red", textDecoration: "underline" }}>
                      <b>0원</b>
                    </span>
                    이여야 합니다.
                  </Typography>
                  <Typography color="text.first">
                    만약에 0원이 아닐 경우{" "}
                    <span style={{ color: "red", fontSize: "1.3rem" }}>
                      <i>모든 금액을 환급해주세요.</i>
                    </span>
                  </Typography>
                  <Typography color="text.first">
                    페이를 삭제하고 다시 등록하고 싶은 경우 계좌 인증을 한 번
                    더해야하는 점 유의해주시기 바랍니다.
                  </Typography>
                  <br />
                  <Typography
                    sx={{ textAlign: "center" }}
                    color="text.secondary"
                  >
                    {`고구마 포인트 잔액 : ${payment.balance}`}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", mb: 2.0 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleClickOpen}
                  >
                    삭제
                  </Button>
                  {/* <Button size="small">Learn More</Button> */}
                </CardActions>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>페이 비밀번호</DialogTitle>
                  <DialogContent>
                    <DialogContentText color="error">{error}</DialogContentText>
                    <TextField
                      //   label="Standard warning"
                      //   variant="standard"
                      color="error"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      inputProps={{ maxLength: 6 }}
                      focused
                    />
                    {/* <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Email Address"
                      type="email"
                      fullWidth
                      variant="standard"
                    /> */}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button color="error" onClick={deletePaymentHandler}>
                      삭제
                    </Button>
                  </DialogActions>
                </Dialog>
              </Fragment>
            </Card>
          </Box>
        </>
      )}
    </Container>
  );
};

export default DeletePayment;
