// UpdateMember.jsx

import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UpdateMemberForm from "../../component/member/UpdateMemberForm";
import { authInstance } from "../../apis/utils/instance";
import ProfileForm from "../../component/member/ProfileForm";

const UpdateMember = () => {
    const navigate = useNavigate();
    const [member, setMember] = useState();

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await authInstance.get("/member/profile/get", {
                    headers: {
                        Accept: "application/json",
                    },
                });
                setMember(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("오류 발생: ", error);
            }
        };
        fetchMemberData();
    }, []);

    const handleUpdateSuccess = async () => {
        // 업데이트 성공 시 다시 멤버 정보를 가져와서 화면을 갱신
        try {
            const response = await authInstance.get("/member/profile/get", {
                headers: {
                    Accept: "application/json",
                },
            });
            setMember(response.data);
        } catch (error) {
            console.error("오류 발생: ", error);
        }
    };

    return (
        <Box p={3} sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <img
                        src="path/to/profile/image.jpg"
                        alt="Profile"
                        style={{ width: "100%", borderRadius: "50%" }}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                        {member?.nickname || "닉네임이 없습니다."}
                    </Typography>
                    {/* ProfileForm 대신 UpdateMemberForm 사용 */}
                    <UpdateMemberForm member={member} onUpdateSuccess={handleUpdateSuccess} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default UpdateMember;
