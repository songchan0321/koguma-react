// ProfileForm.js

import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

const ProfileForm = ({ navigate }) => {
    const handleNavigate = (url) => {
        navigate(url);
    };

    return (
        <Box p={3}>
            <Grid container spacing={2}>
                {/* 내 정보 수정 버튼 */}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleNavigate("/member/update")}
                >
                    내 정보 수정
                </Button>
                {/* 로그아웃 버튼 */}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleNavigate("/common/logout")}
                    style={{ marginLeft: 10 }}
                >
                    로그아웃
                </Button>
                {/* 고구마 포인트 섹션 */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" gutterBottom>
                        포인트
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleNavigate("/payment/get")}
                        width = '3000'
                    >
                        고구마 포인트
                    </Button>
                </Grid>
                {/* 나의 거래 섹션 */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>
                        나의 거래
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleNavigate("/product/my")}
                        fullWidth
                    >
                        내 상품
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleNavigate("/product/like/list")}
                        fullWidth
                        style={{ marginTop: 10 }}
                    >
                        관심 상품
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleNavigate("/product/like/list")}
                        fullWidth
                        style={{ marginTop: 10 }}
                    >
                        즐겨찾는 상품 카테고리
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleNavigate("/product/")}
                        fullWidth
                        style={{ marginTop: 10 }}
                    >
                        판매 내역
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleNavigate("/product/")}
                        fullWidth
                        style={{ marginTop: 10 }}
                    >
                        구매 내역
                    </Button>
                </Grid>
                {/* 동네생활 */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>
                        나의 동네생활
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleNavigate("/post/list/community")}
                        width = '3000'
                    >
                        동네생활 활동
                    </Button>
                </Grid>
                {/* 모임 */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>
                        나의 모임
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleNavigate("/club/list")}
                        width = '3000'
                    >
                        모임 활동
                    </Button>
                </Grid>
                {/* 회원 차단 */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>
                        회원 차단
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleNavigate("/member/relationship/block/list")}
                        width = '3000'
                    >
                        차단
                    </Button>
                </Grid>
                {/* 팔로잉 */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>
                        회원 팔로잉
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleNavigate("/member/relationship/following/list")}
                        width = '3000'
                    >
                        팔로잉
                    </Button>
                </Grid>
                {/* 고객센터 */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>
                        고객센터
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleNavigate("/common/report/list")}
                        fullWidth
                    >
                        문의 및 신고
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleNavigate("/member/delete")}
                        fullWidth
                        style={{ marginTop: 10 }}
                    >
                        회원 탈퇴
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfileForm;
