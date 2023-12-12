import React, { useState } from "react";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";


const DeleteMemberForm = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const [isConfirmationSent, setIsConfirmationSent] = useState(false);

    const handleNavigate = (url) => {
        navigate(url);
    };
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

    const handleDeleteMember = () => {
        // 회원 탈퇴 버튼 클릭 시 '/member/delete'로 이동
        handleNavigate("/member/delete");
    };

    return (
        <Box p={3}>
            <Grid item xs={12} md={8}>
                {!isConfirmationSent ? (
                    <>
                        <TextField
                            label="휴대폰 번호"
                            variant="outlined"
                            fullWidth
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSendConfirmation}
                            fullWidth
                            style={{ marginTop: 10 }}
                        >
                            인증 코드 전송
                        </Button>
                    </>
                ) : (
                    <>
                        <TextField
                            label="인증 코드"
                            variant="outlined"
                            fullWidth
                            value={confirmationCode}
                            onChange={(e) => setConfirmationCode(e.target.value)}
                            style={{ marginTop: 10 }}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleDeleteMember}
                            fullWidth
                            style={{ marginTop: 10 }}
                        >
                            회원 탈퇴
                        </Button>
                    </>
                )}
            </Grid>
        </Box>
    );
};

export default DeleteMemberForm;