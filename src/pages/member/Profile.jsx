import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Grid,
    Typography,
} from "@mui/material";

const ProfileForm = () => {
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate("/edit-profile");
    };

    return (
        <Box p={3}>
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
                    {/* 내 정보 수정 버튼 */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEditProfile}
                    >
                        내 정보 수정
                    </Button>
                    {/* 로그아웃 버튼 */}
                    <Button variant="contained" color="primary" style={{ marginLeft: 10 }}>
                        로그아웃
                    </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                    {/* 고구마 포인트 */}
                    <Button variant="contained" color="primary" fullWidth>
                        고구마 포인트
                    </Button>
                </Grid>
                <Grid item xs={12} md={8}>
                    {/* 나의 거래 섹션 */}
                    <Typography variant="h5" gutterBottom>
                        나의 거래
                    </Typography>
                    <Button variant="contained" color="primary" fullWidth>
                        거래 내역
                    </Button>
                    <Button variant="contained" color="primary" fullWidth>
                        거래 후기
                    </Button>

                    {/* 내 상품 섹션 */}
                    <Typography variant="h5" gutterBottom>
                        내 상품
                    </Typography>
                    <Button variant="contained" color="primary" fullWidth>
                        등록 상품 관리
                    </Button>
                    {/* ... 나머지 버튼들 추가 */}
                </Grid>
                {/* 관심 상품, 즐겨찾는 상품 카테고리, 판매내역, 구매내역, ... 등의 섹션들을 추가 */}
                {/* 나머지 버튼들 추가 */}
            </Grid>
        </Box>
    );
};

export default ProfileForm;
