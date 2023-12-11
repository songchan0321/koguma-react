import React from 'react';
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {authInstance} from "../../apis/utils/instance";

const AddMemberForm = ({
                           nickname,
                           password,
                           confirmPassword,
                           phone,
                           verificationCode,
                           email,
                           onCheckNickname,
                           onNicknameChange,
                           onPasswordChange,
                           onConfirmPasswordChange,
                           onPhoneChange,
                           onRequestVerificationCode,
                           onVerifyPhone,
                           onVerificationCodeChange,
                           onEmailChange,
                           onAddMember,
                       }) => {
    const navigate = useNavigate();

    const handleAddMember = async () => {
        try{
            const response = await authInstance.post("/member/add", {
                headers: {
                    Accept: "application/json",
                },
            });
        } catch (error){
            console.error("오류 발생:", error);
        }
    };

    return (
        <form>
            <div style={{ marginBottom: '10px' }}>
                <TextField
                    label="닉네임"
                    sx={{ width: '200px', marginRight: '10px', marginTop: '80px' }}
                    value={nickname}
                    onChange={onNicknameChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onCheckNickname}
                    sx={{ marginTop: '90px', marginLeft: '20px' }}
                >
                    중복 확인
                </Button>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <TextField
                    label="비밀번호"
                    type="password"
                    sx={{ width: '200px', marginRight: '10px' }}
                    value={password}
                    onChange={onPasswordChange}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <TextField
                    label="비밀번호 확인"
                    type="password"
                    sx={{ width: '200px', marginRight: '10px' }}
                    value={confirmPassword}
                    onChange={onConfirmPasswordChange}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <TextField
                    label="휴대폰 번호"
                    sx={{ width: '200px', marginRight: '10px' }}
                    value={phone}
                    onChange={onPhoneChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onRequestVerificationCode}
                    sx={{ marginTop: '10px', marginLeft: '20px' }}
                >
                    인증 요청
                </Button>
                <TextField
                    label="인증 번호"
                    sx={{ width: '200px', marginRight: '10px', marginTop: '10px' }}
                    value={verificationCode}
                    onChange={onVerificationCodeChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onVerifyPhone}
                    sx={{ marginTop: '20px', marginLeft: '20px' }}
                >
                    인증 확인
                </Button>
                <TextField
                    label="이메일"
                    sx={{ width: '200px', marginRight: '10px', marginTop: '10px' }}
                    value={email}
                    onChange={onEmailChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddMember}
                    sx={{ marginTop: '100px', marginLeft: '115px', width: '150px', height: '50px' }}
                >
                    가입 신청
                </Button>
            </div>
        </form>
    );
};

export default AddMemberForm;
