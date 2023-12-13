// DeleteMember.jsx

import React from "react";
import { Box, Typography } from "@mui/material";
import DeleteMemberForm from "../../component/member/DeleteMemberForm";
import { useNavigate } from "react-router-dom";

const DeleteMember = () => {
    const navigate = useNavigate();

    const handleDeleteMember = () => {
        // 회원 탈퇴 시 페이지 이동을 담당
        window.alert("회원 탈퇴가 완료되었습니다.");
        navigate("/common/login"); // 확인을 누르면 /common/login으로 이동
    };

    return (
        <Box p={3} sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
            <Typography variant="h4" gutterBottom>
                고구마 회원 탈퇴
            </Typography>
            <DeleteMemberForm onSubmit={handleDeleteMember} />
        </Box>
    );
};

export default DeleteMember;
