// DeleteMemberForm.jsx

import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authInstance } from "../../apis/utils/instance";

const DeleteMemberForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const [isConfirmationSent, setIsConfirmationSent] = useState(false);

    const handleSendConfirmation = async () => {
        try {
            const response = await authInstance.post("/auth/sendSms", {
                to: phone,
            });

            // 인증번호가 성공적으로 전송되었다면 화면 전환을 막음
            if (response.status === 200) {
                window.alert('인증번호가 발송되었습니다.');
                setIsConfirmationSent(true);
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    const handleDeleteMember = async () => {
        try {
            if (!isConfirmationSent) {
                // 휴대폰 인증을 완료하지 않은 경우 알림 창 표시
                window.alert('휴대폰 인증을 완료해야 합니다.');
                return;
            }

            // TODO: 서버에 회원 탈퇴 요청하는 API 호출
            const response = await authInstance.post("/auth/verifySms", {
                to: phone,
                authNum: confirmationCode,
            });

            // 실제로는 서버 응답에 따른 로직을 추가해야 합니다.
            if (response.status === 200) {
                // 성공 시 부모 컴포넌트에서 전달받은 onSubmit 함수 호출
                await onSubmit();
            } else {
                // 실패 시 에러 처리
                console.error("회원 탈퇴 실패:", response.statusText);
                window.alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("오류 발생:", error);
            window.alert("회원 탈퇴 중 오류가 발생했습니다.");
        }
    };

    return (
        <Grid container spacing={2}>
            {!isConfirmationSent ? (
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
            ) : (
                <>
                    <Grid item xs={12}>
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
                            onClick={handleDeleteMember}
                            fullWidth
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
