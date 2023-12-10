import axios from "axios";
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://127.0.0.1:8080";
// const BASE_URL = "https://5quys.com";
// const BASE_URL = "http://192.168.0.9:8080";

// jwt 정보 필요 x
const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });

  return instance;
};

// jwt 정보 필요 o
const axiosAuthApi = (url, options) => {
  // const token = "JWT?";
  const token = localStorage.getItem('token');
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    ...options,
  });

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
