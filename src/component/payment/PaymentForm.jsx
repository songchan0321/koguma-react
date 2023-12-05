import { Box, TextField } from "@mui/material";
import { useCallback, useState } from "react";

const PaymentForm = () => {
  const [payment, setPayment] = useState({
    name: "",
    accountNumber: "",
    accountBank: "",
    birthDate: "",
    password1: "",
    password2: "",
  });
  const onlyNumbersPattern = /^\d+$/; // 숫자만 허용하는 정규식

  const handleInput = useCallback((event) => {
    const { name, value } = event.target;
    if (
      (name === "accountNumber" ||
        name === "birthDate" ||
        name === "password1" ||
        name === "password2") &&
      !onlyNumbersPattern.test(value)
    ) {
      return; // 숫자가 아닌 경우에는 더 이상 진행하지 않음
    }
    setPayment({ ...payment, [name]: value });
  }, []);

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
      <TextField
        // id="outlined-required"
        value={payment.name}
        name="name"
        onChange={handleInput}
        label="예금주 이름"
      />
      <TextField
        // id="outlined-disabled"
        // inputProps={{ maxLength: 6, pattern: "[0-9]*", onInput: handleInput }}
        label="계좌번호(-제외)"
        value={payment.accountNumber}
        name="accountNumber"
        onChange={handleInput}
        // defaultValue="계좌번호를 입력하세요"
      />
      <TextField
        // id="outlined-disabled"
        label="은행"
        value={payment.accountBank}
        name="accountBank"
        onChange={handleInput}
      />
      <TextField
        // id="outlined-disabled"
        label="주민번호 앞자리(6자리)"
        inputProps={{ maxLength: 6, inputMode: "numeric", pattern: "[0-9]*" }}
        value={payment.birthDate}
        name="birthDate"
        onChange={handleInput}
      />
      <TextField
        // id="outlined-password-input"
        label="페이 비밀번호 6자리"
        inputProps={{ maxLength: 6, inputMode: "numeric", pattern: "[0-9]*" }}
        type="password"
        // autoComplete="current-password"
        value={payment.password1}
        name="password1"
        onChange={handleInput}
      />
      <TextField
        // id="outlined-password-input"
        label="페이 비밀번호 6자리 확인"
        inputProps={{ maxLength: 6, inputMode: "numeric", pattern: "[0-9]*" }}
        type="password"
        // autoComplete="current-password"
        value={payment.password2}
        name="password2"
        onChange={handleInput}
      />
    </Box>
  );
};

export default PaymentForm;
