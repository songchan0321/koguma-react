import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { authInstance } from "../../apis/utils/instance";

const AddMemberForm = ({ onSubmit }) => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");

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




    const handleSubmit = async () => {
        try {
            // 패스워드 일치 여부 확인
            if (password !== confirmPassword) {
                console.error("비밀번호가 일치하지 않습니다.");
                return;
            }

            // API 호출
            const response = await authInstance.post("/member/add", {
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
            });

            if (response.ok) {
                console.log("회원 가입 성공!");
                // 부모 컴포넌트에 성공을 알림
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
            <TextField label="닉네임" value={nickname} onChange={handleNicknameChange} />
            <TextField
                label="비밀번호"
                type="password"
                value={password}
                onChange={handlePasswordChange}
            />
            <TextField
                label="비밀번호 확인"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
            />
            <TextField label="휴대폰 번호" value={phone} onChange={handlePhoneChange} />

            <div style={{ marginTop: 10 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    가입하기
                </Button>
            </div>
        </div>
    );
};

export default AddMemberForm;
