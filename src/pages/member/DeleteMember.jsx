import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import DeleteMemberForm from "../../component/member/DeleteMemberForm";
import { authInstance } from "../../apis/utils/instance";

const DeleteMember = () => {
    const [isConfirmationSent, setIsConfirmationSent] = useState(false);

    const handleSendConfirmation = async (phone) => {
        try {
            // 서버에 휴대폰 번호로 인증 코드 요청
            const response = await authInstance.post("/send-confirmation-code", { phone });

            // 간단한 시뮬레이션으로 확인 메시지를 띄우고, 사용자가 확인을 누르면 인증이 완료된 것으로 가정
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
            // 서버에 회원 탈퇴 요청
            const response = await authInstance.put("/member/delete", {
                headers: {
                    Accept: "application/json",
                },
            });

            // 간단한 시뮬레이션으로 확인 메시지를 띄우고, 사용자가 확인을 누르면 회원 탈퇴가 진행된 것으로 가정
            const confirmed = window.confirm("정말로 회원 탈퇴하시겠습니까?");
            if (confirmed) {
                // 서버 응답에 따른 추가 로직 구현
                console.log("회원 탈퇴가 완료되었습니다.");
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    return (
        <Box p={3} sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
            <Typography variant="h4" gutterBottom>
                고구마 회원 탈퇴
            </Typography>
            {!isConfirmationSent ? (
                <DeleteMemberForm onSubmit={handleSendConfirmation} />
            ) : (
                <DeleteMemberForm onSubmit={handleDeleteMember} />
            )}
        </Box>
    );
};

export default DeleteMember;
