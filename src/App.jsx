import BottomBar from "./component/common/BottomBar";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme";

const App = () => {

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppRouter />
        <BottomBar />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
