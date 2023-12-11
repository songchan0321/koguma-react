import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../../component/member/ProfileForm";
import {authInstance} from "../../apis/utils/instance";

const Profile = () => {
    const navigate = useNavigate();
    const [member, setMember] = useState(null);

    useEffect(() => {
        // 서버에서 현재 유저 정보를 가져오는 API 호출
        const fetchMemberData = async () => {
            try {
                const response = await authInstance.get("/member/profile/get", {
                    headers: {
                        Accept: "application/json",
                    },
                });
                setMember(response.data); // 유저 정보를 상태에 저장
            } catch (error) {
                console.error("오류 발생:", error);
            }
        };

        fetchMemberData();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출

    return (
        <Box p={3} sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
            {/* Box에 overflowY 및 maxHeight 속성 추가 */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    {/* 프로필 사진 */}
                    <img
                        src="path/to/profile/image.jpg"
                        alt="Profile"
                        style={{ width: "100%", borderRadius: "50%" }}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    {/* 닉네임 */}
                    <Typography variant="h4" gutterBottom>
                        {member?.nickname || "닉네임이 없습니다."}
                    </Typography>
                    {/* ProfileForm 컴포넌트 추가 */}
                    <ProfileForm navigate={navigate} />
                </Grid>
                {/* ... 나머지 컴포넌트들 추가 */}
            </Grid>
        </Box>
    );
};

export default Profile;
