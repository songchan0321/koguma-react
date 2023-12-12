import { createContext, useContext, useEffect, useMemo, useState } from "react";

// const memberId = sessionStorage.getItem("member_id");
const token = localStorage.getItem("token");

export const IsLoginContext = createContext({
  isLogin:
    // memberId !== null &&
    token !== null ? true : false,
});

const LoginContextProvider = ({ children }) => {
  console.log("LoginContextProvider 다시 렌더링 됨");
  const [isLogin, setIsLogin] = useState(
    // memberId !== null &&
    token !== null ? true : false
  );
  // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됨
  const value = useMemo(() => ({ isLogin, setIsLogin }), [isLogin, setIsLogin]);
  //   const [isLogin, setIsLogin] = useState(false);
  return (
    <IsLoginContext.Provider value={value}>{children}</IsLoginContext.Provider>
  );
  //   return children;
};
export function useIsLoginState() {
  const context = useContext(IsLoginContext);
  if (!context) {
    throw new Error("Cannot find IsLoginProvider");
  }
  return context.isLogin;
}
export default LoginContextProvider;
