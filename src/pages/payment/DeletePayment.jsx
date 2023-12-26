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
import { useNavigate } from "react-router-dom";
import TopBar from "../../component/payment/TopBar";
import Back from "../../component/common/Back";
import MarginEmpty from "../../component/payment/MarginEmpty";
import LoadingProgress from "../../component/common/LoadingProgress";
import { getMemberAPI } from "../../apis/api/member";
import { getPaymentAPIService } from "../../apis/services/payment";
import {
  checkPaymentPasswordAPI,
  deletePaymentAPI,
} from "../../apis/api/payment";
import Modal from "../../component/common/Modal";
import { useModal } from "../../context/ModalContext";

const DeletePayment = () => {
  const navigator = useNavigate();
  const { openModal } = useModal();
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
      setOpen(false);
      openModal("잔액을 환급한 뒤 삭제해주세요.", false);
      return;
    }
    (async () => {
      const data = await checkPaymentPasswordAPI(password);
      if (data.result) {
        const data = await deletePaymentAPI(password);
        if (data.result) {
          setOpen(false);
          openModal("삭제 완료", true, () => navigator("/member/profile"));
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
          <Modal />
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
                </CardActions>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    sx: { borderRadius: "1rem", padding: "0 0.4rem" },
                  }}
                >
                  <DialogTitle>페이 비밀번호</DialogTitle>
                  <DialogContent>
                    <DialogContentText color="error">{error}</DialogContentText>
                    <TextField
                      color="error"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      // label="Multiline Placeholder"
                      placeholder="페이 비밀번호 6자리를 입력하세요."
                      type="password"
                      inputProps={{ maxLength: 6 }}
                      focused
                    />
                  </DialogContent>
                  <DialogActions
                    sx={{ pt: 0, display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        backgroundColor: "white",
                        border: "1px solid rgba(0,0,0, 0.2)",
                        color: "black",
                        width: "90%",
                      }}
                      onClick={handleClose}
                    >
                      취소
                    </Button>
                  </DialogActions>
                  <DialogActions
                    sx={{
                      pt: 0,
                      pb: 3,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      // fullWidth
                      sx={{ width: "90%" }}
                      color="error"
                      onClick={deletePaymentHandler}
                    >
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
