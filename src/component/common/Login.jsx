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
  Link,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useNavigate } from "react-router-dom";
import { IsLoginContext } from "../../context/LoginContextProvider";
import { loginAPI } from "../../apis/api/authentication";
import { CHAT_EVENT, SocketContext } from "../../context/socket";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const socket = React.useContext(SocketContext);
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
        socket.emit(CHAT_EVENT.FIRST_CONNECT, {
          token: `${localStorage.getItem("token")}`,
        });
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
              label="아이디"
              name="id"
              autoComplete="id"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#D070FB",
                    color: "#000000",
                  }}
                >
                  {/* <div style={{ paddingTop: "0.3rem", color: "black" }}>
                    로그인
                  </div> */}
                  로그인
                </Button>
              </Grid>
              <Grid item xs={6}>
                {/* <Box sx={{ mt: 3, mb: 2 }}>
                  <img
                    className="kakaoBar"
                    src="/login/kakao_login_medium_narrow (1).png"
                    alt="Kakao Login"
                    onClick={() =>
                      (window.location.href =
                        "https://kauth.kakao.com/oauth/authorize?client_id=ef2f330de7db2127b41280db652748e5&redirect_uri=http://localhost:3000/common/kakao/callback&response_type=code&prompt=login")
                    }
                  />
                </Box> */}
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#FEE500",
                    color: "#000000",
                    "&:active, &:focus": {
                      backgroundColor: "#FEE500", // 클릭 또는 포커스 시 배경색을 기존 색상으로 유지
                    },
                  }}
                  onClick={() =>
                    (window.location.href =
                      "https://kauth.kakao.com/oauth/authorize?client_id=ef2f330de7db2127b41280db652748e5&redirect_uri=https://api.5quys.com/common/kakao/callback&response_type=code&prompt=login")
                  }
                >
                  {/* <div style={{ paddingTop: "0.3rem", color: "black" }}>
                    로그인
                  </div> */}
                  카카오로그인
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => navigator("/member/add")}
                >
                  회원이 아니신가요?
                </Link>
              </Grid>
            </Grid>

            {/* <Button
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigator("/member/add")}
            >
              회원가입
            </Button> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
