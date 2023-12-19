import { authInstance } from "../utils/instance";

const ALERT_API_URI = "/alert";

export const getAlertCountAPI = async () => {
  const { data } = await authInstance.get(`${ALERT_API_URI}/count`);
  return data;
};

export const listAlertAPI = async () => {
  const { data } = await authInstance.get(`${ALERT_API_URI}/list`);
  return data;
};

export const readAlertAPI = async (alertId) => {
  await authInstance.post(`${ALERT_API_URI}/read/${alertId}`);
};

export const readAlertAllAPI = async () => {
  await authInstance.post(`${ALERT_API_URI}/readAll`);
};
