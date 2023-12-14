import BottomBar from "./component/common/BottomBar";
import { BrowserRouter, Link } from "react-router-dom";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme";
import { useContext, useEffect, useState } from "react";
import LoginContextProvider, {
  IsLoginContext,
} from "./context/LoginContextProvider";
import { SocketContext, socket } from "./context/socket";
import AlertAvator from "./component/common/AlertAvator";

const App = () => {
  const { setIsLogin } = useContext(IsLoginContext);
  // const [messageAlertFlag, setMessageAlertFlag] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const messageAlertHandler = (message) => {
    setMessageAlert(message);
    // setTimeOutId(setTimeout(() => {}, 2 * 1000));
    setTimeout(() => {
      (() => setMessageAlert({}))();
    }, 2 * 1000);
  };
  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <ThemeProvider theme={theme}>
          <LoginContextProvider>
            {/* {Object.keys(messageAlert).length > 0 && ( */}
            <AlertAvator message={messageAlert} />
            {/* )} */}
            {/* <AlertAvator /> */}
            <AppRouter messageAlertHandler={messageAlertHandler} />
          </LoginContextProvider>
          {/* <BottomBar /> */}
        </ThemeProvider>
      </SocketContext.Provider>
    </BrowserRouter>
  );
};

export default App;
