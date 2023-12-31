import { defaultInstance } from "../utils/instance";

const PAYMENT_API_URI = "/auth";
export const loginAPI = async (id, pw) => {
  try {
    const response = await defaultInstance.post(
      `${PAYMENT_API_URI}/login`,
      JSON.stringify({
        id,
        pw,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    const authorizationHeader = response.headers["authorization"];
    localStorage.setItem("token", authorizationHeader);
    console.log("Authorization Header:", authorizationHeader);

    return authorizationHeader;
  } catch (err) {
    throw err;
  }
};

export const kakaoLoginAPI = async () => {
  const code = new URL(window.location.href).searchParams.get("code");

  try {
    const response = await defaultInstance.get(
      `https://api.5quys.com/common/kakao/callback?code=${code}`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

// export const checkAccountNameAPI = async (name, account, code) => {
//   try {
//     const { data } = await authInstance.post(
//       `${PAYMENT_API_URI}/check/name`,
//       JSON.stringify({
//         name,
//         account,
//         code,
//       }),
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const addPaymentAPI = async (memberId, account, bankName, password) => {
//   try {
//     const { data } = await authInstance.post(
//       `${PAYMENT_API_URI}/add?memberId=${memberId}`,
//       JSON.stringify({
//         paymentAccount: account,
//         paymentBank: bankName,
//         paymentPw: password,
//       }),
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };
