import React from "react";
import { TextField, Button } from "@mui/material";
import {useNavigate} from "react-router-dom";

const AddMemberForm = ({
                           nickname,
                           password,
                           confirmPassword,
                           phone,
                           verificationCode,
                           isPhoneVerified,
                           onNicknameChange,
                           onPasswordChange,
                           onConfirmPasswordChange,
                           onPhoneChange,
                           onVerificationCodeChange,
                           onCheckNickname,
                           onRequestVerificationCode,
                           onVerifyPhone,
                           onSignUp,
                       }) => {
    const navigate = useNavigate();

    const handleAddMember = async () =>{
        //가입 신청 로직
        //db에 정보 등록하는 로직
        navigate("/member/add/complete");
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
                    onChange={onPhoneChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onVerifyPhone}
                    sx={{ marginTop: '20px', marginLeft: '20px' }}
                >
                    인증 확인
                </Button>

            </div>

            {isPhoneVerified && (
                <>
                    <TextField
                        label="휴대폰 번호 인증"
                        fullWidth
                        value={verificationCode}
                        onChange={onVerificationCodeChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onVerifyPhone}
                    >
                        확인
                    </Button>
                </>
            )}

            <div style={{ marginTop: '10px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSignUp}
                    sx={{ marginTop: '100px', marginLeft: '115px', width: '150px', height: '50px' }}
                >
                    가입 신청
                </Button>
            </div>
        </form>
    );
};

export default AddMemberForm;
