import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authInstance, defaultInstance } from "../../apis/utils/instance";
import Modal from "../common/Modal";
import { useModal } from "../../context/ModalContext";

const DeleteMemberForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [confirmationStep, setConfirmationStep] = useState("sendConfirmation");
  const [isSmsVerified, setIsSmsVerified] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const { openModal } = useModal();
  const handleOpen = () => {
    if (!isSmsVerified) {
      openModal("휴대폰 인증이 필요합니다.", true, () => {});
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirmationCodeChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleSendConfirmation = async () => {
    try {
      const response = await authInstance.post("/auth/sendSms", {
        to: phone,
      });

      if (response.status === 200) {
        openModal("인증번호가 전송되었습니다!", true, () => {
          setConfirmationStep("confirmCode");
        });
      } else {
        console.error("오류 발생:", response.statusText);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const handleVerifyAuthNum = async () => {
    try {
      const response = await defaultInstance.post("/auth/verifySms", {
        to: phone,
        authNumber: confirmationCode,
      });

      if (response.status === 200) {
        openModal("휴대폰 인증 완료!", true, () => {
          setIsSmsVerified(true);
        });
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const handleDeleteMember = async () => {
    try {
      const response = await authInstance.put("/member/delete", {
        phone,
        confirmationCode,
      });

      // 실제로는 서버 응답에 따른 로직을 추가해야 합니다.
      if (response.status === 200) {
        // 성공 시 부모 컴포넌트에서 전달받은 onSubmit 함수 호출
        onSubmit();
        openModal("회원 탈퇴가 완료되었습니다", true, () => {
          navigate("/common/login");
        });
      } else {
        // 실패 시 에러 처리
        console.error("회원 탈퇴 실패:", response.statusText);
        openModal(
          "회원 탈퇴에 실패했습니다. 다시 시도해주세요.",
          true,
          () => {}
        );
      }
    } catch (error) {
      console.error("오류 발생:", error);
      window.alert("회원 탈퇴 중 오류가 발생했습니다.");
    }
  };

  return (
    <Grid container spacing={2}>
      {confirmationStep === "sendConfirmation" && (
        <>
          <Grid item xs={12} sx={{ marginTop: 30 }}>
            <TextField
              label="휴대폰 번호"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ backgroundColor: "#D070FB" }}
              onClick={handleSendConfirmation}
              fullWidth
            >
              인증 코드 전송
            </Button>
            <Modal />
          </Grid>
        </>
      )}
      {confirmationStep === "confirmCode" && (
        <>
          <Grid item xs={12} sx={{ marginTop: "250px" }}>
            <TextField
              label="인증 코드"
              variant="outlined"
              fullWidth
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ backgroundColor: "#D070FB" }}
              onClick={handleVerifyAuthNum}
              fullWidth
            >
              인증 번호 확인
            </Button>
          </Grid>
          <Modal />
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpen}
              fullWidth
              sx={{ backgroundColor: "#D070FB" }}
              style={{ marginBottom: "60px" }}
            >
              회원 탈퇴
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{ sx: { borderRadius: "1rem" } }}
            >
              <DialogContent>
                <DialogContentText color="error">{error}</DialogContentText>
                정말로 탈퇴하시겠습니까?
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
                  sx={{ width: "90%", backgroundColor: "#D070FB" }}
                  color="secondary"
                  onClick={handleDeleteMember}
                >
                  확인
                </Button>
              </DialogActions>
            </Dialog>
            <Modal />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default DeleteMemberForm;
