import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { authInstance } from "../../apis/utils/instance";

const UpdateMemberForm = ({ member, onUpdateSuccess }) => {
    const [newNickname, setNewNickname] = useState(member?.nickname || "");

    useEffect(() => {
        setNewNickname(member?.nickname || "");
    }, [member]);

    const handleNicknameChange = (e) => {
        setNewNickname(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            const response = await authInstance.put("/member/update", {
                nickname: newNickname,
            });

            if (response.status === 200) {
                // 업데이트 성공 시 부모 컴포넌트에 성공을 알림
                onUpdateSuccess();
            } else {
                console.error("업데이트 실패");
            }
        } catch (error) {
            console.error("오류 발생: ", error);
        }
    };

    return (
        <div>
            <TextField
                label="새 닉네임"
                value={newNickname}
                onChange={handleNicknameChange}
            />
            <div style={{ marginTop: 10 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleUpdate}
                >
                    업데이트
                </Button>
            </div>
        </div>
    );
};

export default UpdateMemberForm;
