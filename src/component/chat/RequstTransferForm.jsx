import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import { forwardRef, useContext, useState } from "react";
import { CHAT_EVENT, SocketContext } from "../../context/socket";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RequestTransferForm = ({
  open,
  handleClose,
  roomId,
  sendTextMessageHandler,
}) => {
  const socket = useContext(SocketContext);
  const [point, setPoint] = useState(0);
  const [pointString, setPointString] = useState("0원");
  const pointResetHandler = () => {
    setPoint(0);
    setPointString("0원");
  };
  const requestTransferClickHandler = () => {
    if (point > 0 && point <= 10000000) {
      sendTextMessageHandler(`${point}, 0`, roomId, null, "REQUEST");
      //   socket.emit(CHAT_EVENT.SEND_MESSAGE, {
      //     roomId: roomId,
      //     type: "REQUEST",
      //     message: `${point}, 0`,
      //     token: `${localStorage.getItem("token")}`,
      //   });
      handleClose(pointResetHandler);
    } else {
      alert("요청할 금액을 확인해주세요.");
    }
  };
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
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"송금 요청하기"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          //   label="요청할 금액"
          //   type="number"
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
      <DialogActions>
        <Button onClick={() => handleClose(pointResetHandler)} color="error">
          취소
        </Button>
        <Button onClick={requestTransferClickHandler}>요청</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestTransferForm;
