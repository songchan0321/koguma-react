// AddMemberCompletePage.jsx
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddMemberCompleteForm from "../../component/member/AddMemberCompleteForm";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const AddMemberCompletePage = () => {
    const navigate = useNavigate();

    return (
        <Box p={3} sx={{ overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}>
            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
                    {/* 변경: 아이콘과 문구를 Box 컨테이너로 감싸고 정렬 */}
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "#9400D3", marginTop:'120px' }} />
                        <Typography variant="h6" gutterBottom mt={5}>
                            회원가입 완료!
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    {/* 회원 가입 완료 */}
                    <Box textAlign="center">
                        <Typography variant="h5" mt={2}>
                            고구마 회원이 되신 것을 환영해요.
                        </Typography>
                        <AddMemberCompleteForm navigate={navigate} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddMemberCompletePage;
