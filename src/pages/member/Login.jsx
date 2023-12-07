import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
{/*import loginImage from "./path/to/loginImage.jpg";*/}

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLogin = () => {
        // 여기에서 실제 로그인 처리 로직을 추가해야 합니다.
        // 여기서는 간단한 예시로 임의로 로그인 실패 상황을 만들었습니다.
        if (loginData.username === "example" && loginData.password === "password") {
            navigate("/product/list");
        } else {
            setIsErrorModalOpen(true);
        }
    };

    const handleSignUp = () => {
        console.log("Sign Up Clicked!");
        navigate("/member/add");
    };

    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false);
    };

    return (
        <Box p={3} textAlign="left">
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                로그인
            </Typography>

            {/*<img src={loginImage} alt="Login" style={{ width: "100%" }} />*/}

            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                고구마
            </Typography>
            <Typography sx={{ mb: 2 }}>
                원활한 서비스 이용을 위해 로그인 해주세요.
            </Typography>

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <TextField
                        label="ID"
                        type="text"
                        name="username"
                        value={loginData.username}
                        onChange={handleInputChange}
                        sx={{ width: '200px' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleInputChange}
                        sx={{ width: '200px' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={handleSignUp} sx={{ mt: 2, mr: 2 }}>
                        회원가입
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={handleLogin} sx={{ mt: 2 }}>
                        로그인 하기
                    </Button>
                </Grid>
            </Grid>


            {/* 에러 모달 */}
            <Modal
                open={isErrorModalOpen}
                onClose={handleCloseErrorModal}
                aria-labelledby="error-modal-title"
                aria-describedby="error-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography id="error-modal-title" variant="h6" component="h2">
                        Error
                    </Typography>
                    <Typography id="error-modal-description" sx={{ mt: 2 }}>
                        닉네임 또는 비밀번호가 잘못되었습니다.
                    </Typography>
                    <Button onClick={handleCloseErrorModal} sx={{ mt: 2 }}>
                        확인
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default LoginPage;
