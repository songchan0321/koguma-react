import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography, Checkbox, FormControlLabel } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { defaultInstance } from "../../apis/utils/instance";
import { useNavigate } from "react-router-dom";

const AddMemberForm = ({ onSubmit }) => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [authNum, setAuthNum] = useState("");
    const [isSmsVerified] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [isAgeChecked, setIsAgeChecked] = useState(false);
    const [isUseChecked, setIsUseChecked] = useState(false);
    const [isMarketingChecked, setIsMarketingChecked] = useState(false);

    const navigate = useNavigate();

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleAuthNumChange = (e) => {
        setAuthNum(e.target.value);
    };

    const handleGetAuthNum = async () => {
        try {
            // Your existing code for sending SMS
        } catch (error) {
            console.error("SMS 인증 번호 전송 중 오류 발생:", error);
        }
    };

    const handleVerifyAuthNum = async () => {
        try {
            // Your existing code for verifying SMS
        } catch (error) {
            console.error("SMS 인증 번호 확인 중 오류 발생:", error);
        }
    };

    const handleCheckAll = () => {
        setIsAgeChecked(true);
        setIsUseChecked(true);
        setIsMarketingChecked(true);
        setIsAgreed(true);
    };

    const handleUncheckAll = () => {
        setIsAgeChecked(false);
        setIsUseChecked(false);
        setIsMarketingChecked(false);
        setIsAgreed(false);
    };

    const handleSubmit = async () => {
        try {
            // Your existing code for submitting the form

            if (password !== confirmPassword) {
                window.alert("비밀번호가 일치하지 않습니다.");
                return;
            }

            if (!isSmsVerified) {
                window.alert("휴대폰 인증이 필요합니다.");
                return;
            }

            if (!isAgreed) {
                window.alert("약관에 동의해주세요.");
                return;
            }

            const response = await defaultInstance.post("/auth/member/add", {
                nickname,
                pw: password,
                phone,
                email: null,
                imageId: null,
                score: 36.5,
                roleFlag: false,
                socialFlag: false,
                paymentAccount: null,
                paymentBank: null,
                paymentBalance: null,
                paymentPw: null,
                memberRoleType: "MEMBER",
                image_URL: null,
            });

            if (response.ok) {
                navigate("/member/add/complete");
                onSubmit();
            } else {
                window.alert("회원 가입 실패.");
            }
        } catch (error) {
            console.log(error);
            window.alert("회원가입 성공!");
            navigate("/member/add/complete");
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={3} sx={{ padding: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <LockOutlinedIcon sx={{ fontSize: "large", marginBottom: 2 }} />
                    <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                        가입하기
                    </Typography>
                    <TextField label="닉네임" fullWidth value={nickname} onChange={handleNicknameChange} margin="normal" />
                    <TextField
                        label="비밀번호"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        margin="normal"
                    />
                    <TextField
                        label="비밀번호 확인"
                        fullWidth
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        margin="normal"
                    />
                    <TextField label="휴대폰 번호" fullWidth value={phone} onChange={handlePhoneChange} margin="normal" />
                    <Button variant="contained" color="secondary" onClick={handleGetAuthNum} sx={{ marginTop: 1, marginBottom: 1 }}>
                        인증번호 받기
                    </Button>
                    <TextField label="인증번호" fullWidth value={authNum} onChange={handleAuthNumChange} margin="normal" />
                    <Button variant="contained" color="secondary" onClick={handleVerifyAuthNum} sx={{ marginTop: 1, marginBottom: 2, width: '35.5%' }}>
                        인증 확인
                    </Button>

                    {/* 만 14세 이상입니다 체크박스 */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAgeChecked}
                                onChange={() => setIsAgeChecked(!isAgeChecked)}
                                sx={{ color: "secondary.main" }}
                            />
                        }
                        label={
                            <div>
                                만 14세 이상입니다.
                                <Typography variant="caption" sx={{ color: "primary.main", marginLeft: 1 }}>
                                    [필수]
                                </Typography>
                            </div>
                        }
                        sx={{ marginTop: 1, marginBottom: 1, width: '100%' }}
                    />

                    {/* 이용 약관 체크박스 */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isUseChecked}
                                onChange={() => setIsUseChecked(!isUseChecked)}
                                sx={{ color: "secondary.main" }}
                            />
                        }
                        label={
                            <div>
                                이용 약관에 동의합니다.
                                <Typography variant="caption" sx={{ color: "primary.main", marginLeft: 1 }}>
                                    [필수]
                                </Typography>
                            </div>
                        }
                        sx={{ marginTop: 1, marginBottom: 1, width: '100%' }}
                    />

                    {/* 마케팅 동의 체크박스 */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isMarketingChecked}
                                onChange={() => setIsMarketingChecked(!isMarketingChecked)}
                                sx={{ color: "secondary.main" }}
                            />
                        }
                        label={
                            <div>
                                마케팅 정보 수집 활용에 동의합니다.
                                <Typography variant="caption" sx={{ color: "primary.main", marginLeft: 1 }}>
                                    [선택]
                                </Typography>
                            </div>
                        }
                        sx={{ marginTop: 1, marginBottom: 1, width: '100%' }}
                    />

                    {/* 전체 동의/해제 버튼 */}
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => (isAgreed ? handleUncheckAll() : handleCheckAll())}
                        sx={{ marginTop: 1, marginBottom: 1, width: '35.5%' }}
                    >
                        {isAgreed ? "전체 해제" : "전체 동의"}
                    </Button>

                    <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ marginTop: 2, width: '100%' }}>
                        가입하기
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AddMemberForm;
