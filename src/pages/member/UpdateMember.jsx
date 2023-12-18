// UpdateMember.jsx

import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UpdateMemberForm from "../../component/member/UpdateMemberForm";
import { authInstance } from "../../apis/utils/instance";

const UpdateMember = () => {
    const navigate = useNavigate();
    const [member, setMember] = useState();
    const [profileImageUrl, setProfileImageUrl] = useState(null);

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await authInstance.get("/member/profile/get", {
                    headers: {
                        Accept: "application/json",
                    },
                });
                setMember(response.data);
                console.log(profileImageUrl)
                // 멤버의 ID를 기반으로 프로필 이미지를 가져오는 부분 수정

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
                    {member &&
                    <img
                        src={member.profileURL}
                        alt="Profile"
                        style={{ width: "20%", borderRadius: "20%" }}
                    />
                    }
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                        {member?.nickname || "로딩 중."}
                    </Typography>
                    {/* ProfileForm 대신 UpdateMemberForm 사용 */}
                    <UpdateMemberForm member={member} onUpdateSuccess={handleUpdateSuccess} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default UpdateMember;
