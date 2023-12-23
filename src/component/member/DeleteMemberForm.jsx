import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authInstance, defaultInstance } from "../../apis/utils/instance";

const DeleteMemberForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const [confirmationStep, setConfirmationStep] = useState("sendConfirmation");
    const [isSmsVerified, setIsSmsVerified] = useState(false);

    const handleSendConfirmation = async () => {
        try {
            const response = await authInstance.post("/auth/sendSms", {
                to: phone,
            });

            // 인증번호가 성공적으로 전송되었다면 화면 전환을 막음
            if (response.status === 200) {
                window.alert('인증번호가 발송되었습니다.');
                setConfirmationStep("confirmCode");
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
            console.log(response);
            if (response.status === 200) {
                setIsSmsVerified(true);
                window.alert('휴대폰 인증 성공!');
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    const handleDeleteMember = async () => {
        try {
            if (!isSmsVerified) {
                window.alert("휴대폰 인증이 필요합니다.");
                return;
            }
            const confirmed = window.confirm("정말로 회원 탈퇴하시겠습니까?");
            if (confirmed) {
                const response = await authInstance.put("/member/delete", { phone, confirmationCode });

                // 실제로는 서버 응답에 따른 로직을 추가해야 합니다.
                if (response.status === 200) {
                    // 성공 시 부모 컴포넌트에서 전달받은 onSubmit 함수 호출
                    await onSubmit();
                } else {
                    // 실패 시 에러 처리
                    console.error("회원 탈퇴 실패:", response.statusText);
                    window.alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
                }
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
                            onClick={handleSendConfirmation}
                            fullWidth
                        >
                            인증 코드 전송
                        </Button>
                    </Grid>
                </>
            )}
            {confirmationStep === "confirmCode" && (
                <>
                    <Grid item xs={12} sx={{ marginTop: '250px' }}>
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
                            onClick={handleVerifyAuthNum}
                            fullWidth
                        >
                            인증 번호 확인
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleDeleteMember}
                            fullWidth
                            style={{ marginBottom: '60px' }}
                        >
                            회원 탈퇴
                        </Button>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default DeleteMemberForm;
