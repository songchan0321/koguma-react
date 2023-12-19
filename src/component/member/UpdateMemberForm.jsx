// UpdateMemberForm.jsx

import React, { useState, useEffect } from "react";
import { TextField, Button, Input } from "@mui/material";
import { authInstance } from "../../apis/utils/instance";
import {memberImageAddAPI} from "../../apis/api/member";
import Back from "../../component/common/Back";

const UpdateMemberForm = ({ member, onUpdateSuccess }) => {
    const [newNickname, setNewNickname] = useState(member?.nickname || "");
    const [imageId, setImageId] = useState(null);
    const [file, setFile] = useState(null); // 추가된 부분: 업로드할 파일 상태

    useEffect(() => {
        setNewNickname(member?.nickname || "");
    }, [member]);

    const handleNicknameChange = (e) => {
        setNewNickname(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            console.log(newNickname,imageId)
            const response = await authInstance.put("/member/update", {
                nickname: newNickname,
                profileURL: imageId,
            });

            if (response.status === 200) {
                onUpdateSuccess(imageId); // onUpdateSuccess에 imageId 전달
            } else {
                console.error("업데이트 실패");
            }
        } catch (error) {
            console.error("오류 발생: ", error);
        }
    };

    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await authInstance.post("/image/new", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                const uploadedImageId = response.data[0];
                setImageId(uploadedImageId);
            } else {
                console.error("이미지 업로드 실패");
            }
        } catch (error) {
            console.error("이미지 업로드 중 오류 발생: ", error);
        }
    };

    const handleImageUpdate = async () => {
        try {
            const response = await memberImageAddAPI(imageId);
            console.log(response)
        } catch (error) {
            console.error("이미지 등록 중 오류 발생: ", error);
        }
    };

    return (
        <div>
            <Back />
            <TextField
                label="새 닉네임"
                value={newNickname}
                onChange={handleNicknameChange}
            />

            {/* 이미지 업로드 */}
            <div style={{ marginTop: 10 }}>
                <Input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleImageUpload}
                >
                    프로필 이미지 업로드
                </Button>
            </div>

            {/* 이미지 수정 */}
            {imageId && (
                <div style={{ marginTop: 10 }}>
                    <TextField
                        label="이미지 ID 등록"
                        value={imageId}
                        onChange={(e) => setImageId(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleImageUpdate}
                    >
                        이미지 등록
                    </Button>
                </div>
            )}

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
