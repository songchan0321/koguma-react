import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import { forwardRef, useState } from "react";
import { useModal } from "../../context/ModalContext";
import Modal from "../common/Modal";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RequestTransferForm = ({
  open,
  handleClose,
  roomId,
  sendTextMessageHandler,
}) => {
  const [point, setPoint] = useState(0);
  const { openModal } = useModal();
  const [pointString, setPointString] = useState("0원");
  const pointResetHandler = () => {
    setPoint(0);
    setPointString("0원");
  };
  const requestTransferClickHandler = () => {
    if (point > 0 && point <= 10000000) {
      sendTextMessageHandler({ text: `${point}, 0`, type: "REQUEST" });
      handleClose(pointResetHandler);
    } else {
      openModal("요청할 금액을 확인해주세요.", false, () => {});
    }
  };
  const pointInputHandler = (event) => {
    const { value } = event.target;
    const replaceValue =
      pointString.length < value.length
        ? value.replaceAll("원", "").replace(/,/g, "")
        : value.substring(0, value.length - 1).replace(/,/g, "");
    const onlyNumbersPattern = /^\d+$/; // 숫자만 허용하는 정규식

    if (value.length > 1 && !onlyNumbersPattern.test(replaceValue)) {
      return; // 숫자가 아닌 경우에는 더 이상 진행하지 않음
    }
    setPoint(Number(replaceValue));
    setPointString(Number(replaceValue).toLocaleString("ko-KR") + "원");
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose(pointResetHandler)}
      aria-describedby="alert-dialog-slide-description"
    >
      <Modal />
      <DialogTitle>{"송금 요청하기"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          color="secondary"
          onChange={pointInputHandler}
          value={pointString}
          error={point > 10000000}
          helperText={
            point <= 0
              ? "요청할 금액을 입력하세요!"
              : point > 10000000
              ? "천만원 이상은 요청할 수 없어요..."
              : ""
          }
          variant="outlined"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          InputLabelProps={{
            shrink: !point ? false : true,
          }}
        />
      </DialogContent>
      <DialogActions sx={{ pt: 0, display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: "white",
            border: "1px solid rgba(0,0,0, 0.2)",
            color: "black",
            width: "90%",
          }}
          onClick={() => handleClose(pointResetHandler)}
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
          sx={{
            width: "90%",
            backgroundColor: "#D070FB",
            "&:hover": {
              backgroundColor: "#D070FB", // hover 효과 시 변경할 배경색
            },
          }}
          onClick={requestTransferClickHandler}
        >
          요청
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestTransferForm;
