import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8080";
// const BASE_URL = "https://5quys.com";
const BASE_URL = "http://192.168.0.9:8080";

// jwt 정보 필요 x
const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });

  return instance;
};

// jwt 정보 필요 o
const axiosAuthApi = (url, options) => {
  // const token = "JWT?";
  const token = null;

  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    ...options,
  });

  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
