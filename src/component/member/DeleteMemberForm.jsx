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
            // TODO: 서버에 휴대폰 번호로 인증 코드 요청하는 API 호출
            // const response = await sendConfirmationCode(phone);
            // 실제로는 서버와의 통신이 필요하며, 휴대폰 번호로 인증 코드를 요청하고 응답을 기다리는 로직이 들어갑니다.

            // 여기서는 간단한 시뮬레이션으로 확인 메시지를 띄우고, 사용자가 확인을 누르면 인증이 완료된 것으로 가정합니다.
            const confirmed = window.confirm("휴대폰 번호로 전송된 인증 코드를 확인했습니까?");
            if (confirmed) {
                setIsConfirmationSent(true);
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    const handleDeleteMember = async () => {
        try {
            // TODO: 서버에 회원 탈퇴 요청하는 API 호출
             const response = await authInstance.put("/member/delete", { phone, confirmationCode });

            // 간단한 시뮬레이션으로 확인 메시지를 띄우고, 사용자가 확인을 누르면 회원 탈퇴가 진행된 것으로 가정
            const confirmed = window.confirm("정말로 회원 탈퇴하시겠습니까?");
            if (confirmed) {
                // 성공 시 부모 컴포넌트에서 전달받은 onSubmit 함수 호출
                onSubmit();
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    return (
        <Grid container spacing={2}>
            {!isConfirmationSent ? (
                <>
                    <Grid item xs={12}>
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
