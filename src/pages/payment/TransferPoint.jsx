import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { getMemberAPI } from "../../apis/api/member";
import LoadingProgress from "../../component/common/LoadingProgress";
import TopBar from "../../component/payment/TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import MarginEmpty from "../../component/payment/MarginEmpty";
import Back from "../../component/common/Back";
import {
  checkPaymentPasswordAPI,
  existPaymentAPI,
  requestRefundPointAPI,
  transferPointAPI,
} from "../../apis/api/payment";
import { getChatRoomAPI } from "../../apis/api/chat";
import { isBuyerByChatroom } from "../../apis/utils/util";
import { CHAT_EVENT, SocketContext } from "../../context/socket";

const TransferPoint = () => {
  const navigator = useNavigate();
  const {
    state: { roomId },
  } = useLocation();
  const socket = useContext(SocketContext);
  const [chatRoom, setChatRoom] = useState(null);
  const [member, setMember] = useState(null);
  const [balance, setBalance] = useState(null);
  const [point, setPoint] = useState(0);
  const [pointString, setPointString] = useState("");
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    (async () => {
      await getMemberAPI()
        .then((data) => {
          setMember(data);
          if (data.paymentAccount === null) {
            alert("고구마 페이가 없습니다! 먼저 등록해주세요.");
            navigator("/payment/get", { replace: true });
          }
          return data;
        })
        .then((data) => setBalance(Number(data.paymentBalance)))
        .catch((err) => console.log(err));
    })();
    (async () => {
      await getChatRoomAPI(roomId).then((data) => setChatRoom(data));
    })();
  }, [roomId]);

  const transferPaymentHandler = () => {
    // (async () => {
    //   try {
    //     await transferPointAPI(
    //       point,
    //       chatRoom.buyerDTO.id === member.id
    //         ? chatRoom.productDTO.sellerDTO
    //         : chatRoom.buyerDTO,
    //       chatRoom
    //     );
    //     socket.emit(CHAT_EVENT.SEND_MESSAGE, {
    //       roomId: roomId,
    //       type: "TRANSFER",
    //       message: `${point}`,
    //       token: `${localStorage.getItem("token")}`,
    //     });
    //     navigator(`/payment/success/transfer?roomId=${roomId}`, {
    //       replace: true,
    //     });
    //   } catch (err) {
    //     alert(err.data);
    //   }
    // })();
    (async () => {
      const data = await checkPaymentPasswordAPI(password);
      if (data.result) {
        await transferPointAPI(
          point,
          chatRoom.buyerDTO.id === member.id
            ? chatRoom.productDTO.sellerDTO
            : chatRoom.buyerDTO,
          chatRoom
        ).catch((err) => alert(err.content));
        socket.emit(CHAT_EVENT.SEND_MESSAGE, {
          roomId: roomId,
          type: "TRANSFER",
          message: `${point}`,
          token: `${localStorage.getItem("token")}`,
        });
        navigator(`/payment/success/transfer?roomId=${roomId}`, {
          replace: true,
        });
      } else {
        setError("비밀번호가 일치하지 않습니다!");
      }
    })();
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

  // const buttonClickHandler = () => {
  //   (async () => {
  //     try {
  //       await transferPointAPI(
  //         point,
  //         chatRoom.buyerDTO.id === member.id
  //           ? chatRoom.productDTO.sellerDTO
  //           : chatRoom.buyerDTO,
  //         chatRoom
  //       );
  //       socket.emit(CHAT_EVENT.SEND_MESSAGE, {
  //         roomId: roomId,
  //         type: "TRANSFER",
  //         message: `${point}`,
  //         token: `${localStorage.getItem("token")}`,
  //       });
  //       navigator(`/payment/success/transfer?roomId=${roomId}`, {
  //         replace: true,
  //       });
  //     } catch (err) {
  //       alert(err.data);
  //     }
  //   })();
  // };

  return (
    <Container fixed>
      <TopBar>송금하기</TopBar>
      <Back />
      <MarginEmpty value={"70px"} />
      {member === null || chatRoom === null ? (
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
            label="송금할 금액을 입력해주세요"
            helperText={
              point <= 0
                ? `고구마 포인트 잔액: ${
                    balance.toLocaleString("ko-KR") + "원"
                  }`
                : balance - point < 0
                ? `송금은 0원 이상할 수 있어요...`
                : `송금 후 잔액: ${
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
              onClick={handleClickOpen}
            >
              송금하기
            </Button>
          </Box>
        </Box>
      )}
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
          <Button color="error" onClick={transferPaymentHandler}>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TransferPoint;
