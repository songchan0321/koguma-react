import {
  Alert,
  AlertTitle,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import BankForm from "./BankForm";
import { addPaymentAPI, checkAccountNameAPI } from "../../apis/api/payment";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const navigator = useNavigate();

  const checkAccountName = () => {
    (async () => {
      try {
        setLoading(true);
        const { result } = await checkAccountNameAPI(
          payment.name,
          payment.accountNumber,
          payment.accountBank.code
        );
        if (result) {
          setError("");
          setNextStep(true);
        } else {
          setError("예금주 이름이 일치하지 않습니다.");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("계좌를 찾을 수 없습니다.");
        setLoading(false);
      }
    })();
  };

  const addPayment = () => {
    (async () => {
      setLoading(true);
      await addPaymentAPI(
        3,
        payment.accountNumber,
        payment.accountBank.name,
        payment.password1
      )
        .then(() => {
          setLoading(false);
          alert("페이 등록 성공");
          navigator("/payment/get");
        })
        .catch((err) => {
          console.log(err);
          setError("등록에 실패했습니다.");
        })
        .finally(setLoading(false));
    })();
  };
  const [payment, setPayment] = useState({
    name: "",
    accountNumber: "",
    accountBank: {},
    birthDate: "",
    password1: "",
    password2: "",
  });
  const [openBankModal, setOpenBankModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nextStep, setNextStep] = useState(false);
  const [activeSubmit, setActiveSubmit] = useState(false);
  useEffect(() => {
    if (
      payment.password1.length === 6 &&
      payment.password2.length === 6 &&
      payment.password1 === payment.password2
    ) {
      setActiveSubmit(true);
    } else {
      setActiveSubmit(false);
    }
  }, [payment]);

  const handleBankModalOpen = () => {
    setOpenBankModal(true);
  };

  const handleBankModalClose = () => {
    setOpenBankModal(false);
  };

  const handleBankSelect = (bank) => {
    setPayment({ ...payment, accountBank: bank });
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    const onlyNumbersPattern = /^\d+$/; // 숫자만 허용하는 정규식
    const regexp = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
    if (value !== "" && name === "name" && regexp.test(value)) {
      return;
    }

    if (
      value !== "" &&
      (name === "accountNumber" ||
        name === "birthDate" ||
        name === "password1" ||
        name === "password2") &&
      !onlyNumbersPattern.test(value)
    ) {
      return; // 숫자가 아닌 경우에는 더 이상 진행하지 않음
    }
    setPayment({ ...payment, [name]: value });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {
          m: 1,
          width: "90%",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {error !== "" && (
        <Alert severity="error" sx={{ mb: 1.5 }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}

      <TextField
        value={payment.name}
        name="name"
        onChange={handleInput}
        onKeyDown={handleInput}
        inputProps={{
          disabled: nextStep,
        }}
        label="예금주 이름"
      />
      <TextField
        label="계좌번호(-제외)"
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
          disabled: nextStep,
        }}
        value={payment.accountNumber}
        name="accountNumber"
        onChange={handleInput}
      />
      <TextField
        InputProps={{
          readOnly: !nextStep,
          disabled: nextStep,
        }}
        InputLabelProps={{
          shrink: Object.keys(payment.accountBank).length !== 0,
        }}
        label="은행"
        value={payment.accountBank.name}
        name="accountBank"
        onClick={handleBankModalOpen}
        onChange={handleInput}
      />
      <BankForm
        open={openBankModal}
        onClose={handleBankModalClose}
        onSelectBank={handleBankSelect}
      />
      {nextStep && (
        <>
          <TextField
            label="페이 비밀번호 6자리"
            inputProps={{
              maxLength: 6,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            type="password"
            value={payment.password1}
            name="password1"
            onChange={handleInput}
          />
          <TextField
            label="페이 비밀번호 6자리 확인"
            inputProps={{
              maxLength: 6,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            type="password"
            value={payment.password2}
            name="password2"
            onChange={handleInput}
          />
        </>
      )}

      <Box sx={{ textAlign: "center" }}>
        <Button
          disabled={nextStep && !activeSubmit}
          variant="contained"
          sx={{ backgroundColor: "#D070FB" }}
          onClick={!nextStep ? checkAccountName : addPayment}
        >
          {!nextStep ? "예금주 확인하기" : "페이 등록하기"}
        </Button>
      </Box>
      <BankForm />
    </Box>
  );
};

export default PaymentForm;
