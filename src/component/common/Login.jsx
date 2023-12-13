import * as React from "react";
import { useState } from "react";

import {
  Avatar,
  Button,
  CssBaseline,
  Backdrop,
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useNavigate } from "react-router-dom";
import { IsLoginContext } from "../../context/LoginContextProvider";
import { loginAPI } from "../../apis/api/authentication";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const defaultTheme = createTheme();
  const navigator = useNavigate();
  const { setIsLogin } = React.useContext(IsLoginContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    (async () => {
      try {
        setLoading(true);
        const currentQuery = window.location.search;
        const data = await loginAPI(form.get("id"), form.get("password"));

        alert("로그인 성공");
        setIsLogin(true);
        navigator("/product/list");
      } catch (err) {
        console.error(err);
        alert("로그인 실패");
      } finally {
        setLoading(false);
      }
    })();
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        ></Backdrop>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="id"
              name="id"
              autoComplete="id"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              color="secondary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  type="submit"
                  fullWidth
                  color="secondary"
                  variant="contained"
                  sx={{ height: "100%" }} // 높이 조절
                >
                  회원가입
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  className="kakaoBar"
                  src="/login/kakao_login_medium_narrow (1).png"
                  alt="Kakao Login"
                  onClick={() =>
                    (window.location.href =
                      "https://kauth.kakao.com/oauth/authorize?client_id=ef2f330de7db2127b41280db652748e5&redirect_uri=http://localhost:3000/common/kakao/callback&response_type=code&prompt=login")
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
