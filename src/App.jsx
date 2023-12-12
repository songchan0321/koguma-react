import BottomBar from "./component/common/BottomBar";
import { BrowserRouter, Link } from "react-router-dom";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme";
import { useContext, useEffect } from "react";
import LoginContextProvider, {
  IsLoginContext,
} from "./context/LoginContextProvider";
import { SocketContext, socket } from "./context/socket";

const App = () => {
  const { setIsLogin } = useContext(IsLoginContext);

  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <ThemeProvider theme={theme}>
          <LoginContextProvider>
            <AppRouter />
          </LoginContextProvider>
          {/* <BottomBar /> */}
        </ThemeProvider>
      </SocketContext.Provider>
    </BrowserRouter>
  );
};

export default App;
