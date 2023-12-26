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
} from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { getMemberAPI } from "../../apis/api/member";
import LoadingProgress from "../../component/common/LoadingProgress";
import TopBar from "../../component/payment/TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import MarginEmpty from "../../component/payment/MarginEmpty";
import Back from "../../component/common/Back";
import {
  checkPaymentPasswordAPI,
  transferPointAPI,
} from "../../apis/api/payment";
import { enterChatRoomAPI, getChatRoomAPI } from "../../apis/api/chat";
import { CHAT_EVENT, SocketContext } from "../../context/socket";
import { useModal } from "../../context/ModalContext";
import Modal from "../../component/common/Modal";

const TransferPoint = () => {
  const navigator = useNavigate();
  const {
    state: { roomId, requestPoint, messageId },
  } = useLocation();
  const socket = useContext(SocketContext);
  const { openModal } = useModal();
  const [chatRoom, setChatRoom] = useState(null);
  const [member, setMember] = useState(null);
  const [balance, setBalance] = useState(null);
  const [point, setPoint] = useState(0);
  const [pointString, setPointString] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (requestPoint) {
      setPoint(Number(requestPoint));
      setPointString(Number(requestPoint).toLocaleString("ko-KR") + "원");
    }
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setPassword(null);
    setError("");
  };
  const sendTextMessageHandler = async (text, roomId, toId, type) => {
    // 차단 여부 check true:
    // 나간 여부 check 그냥 emit 후 서버에서 알림 발송 x
    // 차단 여부 check false: emit하기 전에
    // enter_date 설정, emit 후 서버에서 알림 발송
    if (messageId != null) {
      socket.emit(CHAT_EVENT.UPDATE_MESSAGE, {
        roomId: roomId,
        messageId: messageId,
        content: `${requestPoint}, 1`,
      });
    }
    await enterChatRoomAPI(roomId).then((data) => {
      if (data.result) {
        (async () => {
          const updateChatroom = await getChatRoomAPI(roomId);
          socket.emit(CHAT_EVENT.SEND_MESSAGE, {
            roomId: roomId,
            toId: toId,
            type: type,
            token: `${localStorage.getItem("token")}`,
            enter_date:
              updateChatroom.buyerDTO.id === member.id
                ? updateChatroom.sellerEnterDate
                : updateChatroom.buyerEnterDate,
            message: text,
          });
        })();
      } else {
        socket.emit(CHAT_EVENT.SEND_MESSAGE, {
          roomId: roomId,
          toId: toId,
          type: type,
          token: `${localStorage.getItem("token")}`,
          message: text,
        });
      }
    });
  };
  useEffect(() => {
    (async () => {
      await getMemberAPI()
        .then((data) => {
          setMember(data);
          if (data.paymentAccount === null) {
            setOpen(false);
            openModal(
              "고구마 페이가 없습니다! 먼저 등록해주세요.",
              false,
              () => {
                navigator("/payment/get", { replace: true, state: { roomId } });
              }
            );
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
    (async () => {
      const data = await checkPaymentPasswordAPI(password);
      if (data.result) {
        await transferPointAPI(
          point,
          chatRoom.buyerDTO.id === member.id
            ? chatRoom.productDTO.sellerDTO
            : chatRoom.buyerDTO,
          chatRoom
        )
          .then(() => {
            sendTextMessageHandler(`${point}`, roomId, null, "TRANSFER");
            navigator(`/payment/success/transfer?roomId=${roomId}`, {
              replace: true,
            });
          })
          .catch((err) => {
            setOpen(false);
            openModal(
              "상대방의 고구마 페이가 등록되어있지 않습니다.",
              false,
              () => {
                handleClose();
              }
            );
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
    const onlyNumbersPattern = /^\d+$/; // 숫자만 허용하는 정규식
    if (value.length > 1 && !onlyNumbersPattern.test(replaceValue)) {
      return; // 숫자가 아닌 경우에는 더 이상 진행하지 않음
    }
    setPoint(Number(replaceValue));
    setPointString(Number(replaceValue).toLocaleString("ko-KR") + "원");
  };

  return (
    <Container fixed>
      <Modal />
      <TopBar>송금하기</TopBar>
      <Back />
      <MarginEmpty value={"70px"} />
      {member === null || chatRoom === null ? (
        <LoadingProgress />
      ) : (
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            name="point"
            value={pointString}
            onChange={pointInputHandler}
            color="secondary"
            error={balance - point < 0}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              readOnly: !!requestPoint,
            }}
            label={
              requestPoint
                ? "송금 요청에 의한 송금은 금액을 변경할 수 없어요..."
                : "송금할 금액을 입력해주세요"
            }
            InputProps={{
              readOnly: true,
            }}
            helperText={
              point <= 0 ? (
                `고구마 포인트 잔액: ${balance.toLocaleString("ko-KR") + "원"}`
              ) : balance - point < 0 ? (
                <Fragment>
                  {(-balance + point).toLocaleString("ko-KR") + "원"}만큼 잔액이
                  부족해요...
                  <Button
                    sx={{ fontSize: "0.7rem" }}
                    color="primary"
                    onClick={() => navigator(`/payment/charge`)}
                  >
                    <i>
                      <u>충전이 필요하신가요?</u>
                    </i>
                  </Button>
                </Fragment>
              ) : (
                `송금 후 잔액: ${
                  (balance - point).toLocaleString("ko-KR") + "원"
                }`
              )
            }
          />
          <Box sx={{ textAlign: "center" }}>
            <Button
              disabled={balance - point < 0 || point <= 0}
              sx={{
                mt: 1,
                backgroundColor: "#D070FB",
                "&:hover": {
                  backgroundColor: "#D070FB", // hover 효과 시 변경할 배경색
                },
              }}
              size="large"
              variant="contained"
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
            color="error"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            inputProps={{ maxLength: 6 }}
            focused
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            취소
          </Button>
          <Button onClick={transferPaymentHandler}>송금</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TransferPoint;
