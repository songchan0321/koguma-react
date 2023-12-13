import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL;
const CHAT_BASE_URL = process.env.REACT_APP_CHAT_URL;
// jwt 정보 필요 x
const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });

  return instance;
};

// jwt 정보 필요 o
const axiosAuthApi = (url, options) => {
  // const token = "JWT?";
  const token = localStorage.getItem("token");
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `${token}` },
    ...options,
  });

  instance.interceptors.request.use(
    function (config) {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        config.headers.Authorization = `${accessToken}`;
      } else {
        window.location.href = "/common/login";
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => response, // 성공한 응답은 그대로 반환
    (error) => {
      if (error.response && error.response.status === 401) {
        window.location.href = "/common/login";
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
export const authNodeInstance = axiosAuthApi(CHAT_BASE_URL);
