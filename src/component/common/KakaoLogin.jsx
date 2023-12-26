import React, { useEffect, useState } from "react";
import { kakaoLoginAPI } from "../../apis/api/authentication";
import { Backdrop, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { IsLoginContext } from "../../context/LoginContextProvider";
import { CHAT_EVENT, SocketContext } from "../../context/socket";
import Modal from "./Modal";

const KakaoLogin = () => {
  const [loading, setLoading] = useState(false);
  const socket = React.useContext(SocketContext);
  const [error, setError] = useState("");
  const defaultTheme = createTheme();
  const { openModal } = useModal();

  const navigator = useNavigate();
  const { setIsLogin } = React.useContext(IsLoginContext);
  const login = async () => {
    try {
      setLoading(true);
      const currentQuery = window.location.search;
      const response = await kakaoLoginAPI();
      console.log(response);
      const authorizationHeader = response.headers["authorization"];
      if (authorizationHeader === undefined) {
        console.log(response.data);

        await openModal(
          <div>
            카카오 연동정보가 없습니다.
            <br />
            회원 가입을 진행해주세요.
          </div>,
          false,
          () => {
            navigator("/member/add", { state: { kakaoEmail: response.data } });
          }
        );

        return;
      }

      localStorage.setItem("token", authorizationHeader);
      console.log("Authorization Header:", authorizationHeader);

      socket.emit(CHAT_EVENT.FIRST_CONNECT, {
        token: `${localStorage.getItem("token")}`,
      });
      await openModal("카카오 로그인 성공!", true, () => {
        setIsLogin(true);
        navigator("/product/list");
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    login();
  }, []);
  return (
    <>
      <Modal />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      ></Backdrop>
    </>
  );
};
export default KakaoLogin;
