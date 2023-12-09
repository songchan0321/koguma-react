import React, { useState } from "react";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddMemberPage = () => {
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
            <Typography variant="h4" gutterBottom>
                회원 가입
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="닉네임"
                        sx={{ width: '200px', margin: 'normal' }}
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCheckNickname}
                        sx={{ marginLeft: '60px' }} // 왼쪽 마진 추가
                    >
                        중복 확인
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="비밀번호"
                        type="password"
                        sx={{ width: '200px', margin: 'normal' }}
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="비밀번호 확인"
                        type="password"
                        sx={{ width: '200px', margin: 'normal' }}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="휴대폰 번호"
                        sx={{ width: '200px', margin: 'normal' }}
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCheckNickname}
                        sx={{ marginLeft: '60px' }} // 왼쪽 마진 추가
                    >
                        인증 요청
                    </Button>
                </Grid>
                {isPhoneVerified && (
                    <Grid item xs={12}>
                        <TextField
                            label="휴대폰 번호 인증"
                            fullWidth
                            value={verificationCode}
                            onChange={handleVerificationCodeChange}
                        />
                        <Button variant="contained" color="primary" onClick={handleVerifyPhone}>
                            확인
                        </Button>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCheckNickname}
                        sx={{ marginLeft: '60px' }} // 왼쪽 마진 추가
                    >
                        가입 신청
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddMemberPage;
