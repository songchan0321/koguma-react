import React, { useState, useEffect } from "react";
import { TextField, Button, Input } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { authInstance } from "../../apis/utils/instance";
import Back from "../../component/common/Back";
import BottomBar from "../../component/common/BottomBar";
import TopBar from "../../component/payment/TopBar";

const UpdateMemberForm = ({ member, onUpdateSuccess }) => {
    const [newNickname, setNewNickname] = useState(member?.nickname || "");
    const [imageId, setImageId] = useState(member?.profileURL || null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        setNewNickname(member?.nickname || "");
        setImageId(member?.profileURL || null);
    }, [member]);

    const handleNicknameChange = (e) => {
        setNewNickname(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            const response = await authInstance.put("/member/update", {
                nickname: newNickname,
                profileURL: imageId,
            });

            if (response.status === 200) {
                onUpdateSuccess(imageId);
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

    return (
        <div>
            <BottomBar />
            <Back />
            <TopBar>회원 정보 수정</TopBar>
            <div style={{ textAlign: 'center' }}>

                <div style={{ marginTop: 10 }}>
                    <label htmlFor="upload-input">
                        <Input
                            id="upload-input"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <Button
                            color="secondary"
                            variant="contained"
                            component="label"
                            htmlFor="upload-input"
                            startIcon={<CloudUploadIcon />}
                            onClick={handleImageUpload}
                            style={{ fontSize: '12px',backgroundColor:'#D070FB' }}
                        >
                            프로필 업로드
                        </Button>
                    </label>
                </div>
            </div>

            <TextField
                label="새 닉네임"
                value={newNickname}
                onChange={handleNicknameChange}
                style={{ width: '100%', marginTop: '10px' }}
            />

            <div style={{ marginTop: 10 }}>
                <Button
                    variant="contained"
                    onClick={handleUpdate}
                    style={{ width: '100%', backgroundColor:'#D070FB' }}
                >
                    변경
                </Button>
            </div>
        </div>
    );
};

export default UpdateMemberForm;
