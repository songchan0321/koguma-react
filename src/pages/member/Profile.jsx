import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../../component/member/ProfileForm";

const Profile = () => {
    const navigate = useNavigate();

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
                        유저 닉네임
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
