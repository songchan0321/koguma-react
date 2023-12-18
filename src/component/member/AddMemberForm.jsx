// AddMemberForm.jsx

import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import {authInstance, defaultInstance} from "../../apis/utils/instance";
import { useNavigate } from "react-router-dom";

const AddMemberForm = ({ onSubmit }) => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [authNum, setAuthNum] = useState(""); // 추가된 부분: SMS 인증 번호 상태

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
            const response = await defaultInstance.post("/auth/sendSms", {
                to: phone,
            });
            console.log(response);

            // 인증번호가 성공적으로 전송되었다면 화면 전환을 막음
            if (response === 200) {
                window.alert('인증번호가 발송되었습니다.');
                // 추가로 필요한 작업 수행...
            }
        } catch (error) {
            console.error("SMS 인증 번호 전송 중 오류 발생:", error);
        }
    };

    const handleVerifyAuthNum = async () => {
        try {
            const response = await defaultInstance.post("/auth/verifySms", {
                to: phone,
                authNum,
            });
            console.log(response);
        } catch (error) {
            console.error("SMS 인증 번호 확인 중 오류 발생:", error);
        }
    };

    const handleSubmit = async () => {
        try {
            // 패스워드 일치 여부 확인
            if (password !== confirmPassword) {
                console.error("비밀번호가 일치하지 않습니다.");
                return;
            }

            // SMS 인증 번호 확인
            await handleVerifyAuthNum();

            // API 호출
            const response = await defaultInstance.post("/auth/member/add", {
                nickname,
                pw: password,
                phone,
                // ... other fields ...
            });

            if (response.ok) {
                // 회원 가입 성공 시 "/member/add/complete" 경로로 이동
                navigate("/member/add/complete");
                onSubmit();
            } else {
                console.error("회원 가입 실패.");
            }
        } catch (error) {
            console.error("가입 중 오류 발생:", error);
        }
    };

    return (
        <div>
            <div>
                <TextField label="닉네임" value={nickname} onChange={handleNicknameChange} />
            </div>
            <div>
                <TextField
                    label="비밀번호"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div>
                <TextField
                    label="비밀번호 확인"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
            </div>
            <div>
                <TextField label="휴대폰 번호" value={phone} onChange={handlePhoneChange} />
            </div>
            <div>
                {/* SMS 인증 번호 입력 필드 */}
                <TextField label="인증번호" value={authNum} onChange={handleAuthNumChange} />
            </div>
            <div>
                {/* SMS 인증 버튼 */}
                <Button variant="contained" color="secondary" onClick={handleGetAuthNum}>
                    인증번호 받기
                </Button>
            </div>
            <div style={{ marginTop: 10 }}>
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                    가입하기
                </Button>
            </div>
        </div>
    );
};

export default AddMemberForm;
