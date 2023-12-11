import React, { useState } from "react";
import { Alert, AlertTitle, Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddMemberForm from "../../component/member/AddMemberForm";

const AddMember = () => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);

    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleVerificationCodeChange = (event) => {
        setVerificationCode(event.target.value);
    };

    const handleCheckNickname = () => {
        console.log(`Checking nickname: ${nickname}`);
    };

    const handleRequestVerificationCode = () => {
        console.log(`Requesting verification code for phone: ${phone}`);
    };

    const handleVerifyPhone = () => {
        console.log(`Verifying phone: ${verificationCode}`);
        setIsPhoneVerified(true);
    };

    const handleSignUp = () => {
        console.log("Signing up...");
    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom sx={{ marginTop: '60px' }}>
                회원 가입
            </Typography>

            <Grid container spacing={2}>
                <AddMemberForm
                    nickname={nickname}
                    password={password}
                    confirmPassword={confirmPassword}
                    phone={phone}
                    verificationCode={verificationCode}
                    isPhoneVerified={isPhoneVerified}
                    onNicknameChange={handleNicknameChange}
                    onPasswordChange={handlePasswordChange}
                    onConfirmPasswordChange={handleConfirmPasswordChange}
                    onPhoneChange={handlePhoneChange}
                    onVerificationCodeChange={handleVerificationCodeChange}
                    onCheckNickname={handleCheckNickname}
                    onRequestVerificationCode={handleRequestVerificationCode}
                    onVerifyPhone={handleVerifyPhone}
                    onSignUp={handleSignUp}
                />
            </Grid>
        </Box>
    );
};

export default AddMember;
