import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddMemberForm from "../../component/member/AddMemberForm";
import {authInstance} from "../../apis/utils/instance";

const AddMember = () => {
    const handleAddMemberSubmit = async (memberDTO) => {
        try {
            const response = await authInstance.post("/member/add", {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(memberDTO),
            });

            if (response.ok) {
                console.log('회원 가입 성공!');
            } else {
                console.error('회원 가입 실패.');
            }
        } catch (error) {
            console.error('가입 중 오류 발생:', error);
        }
    };

    return (
        <div>
            <h1>회원 가입 페이지</h1>
            <AddMemberForm onSubmit={handleAddMemberSubmit} />
        </div>
    );
};

export default AddMember;
