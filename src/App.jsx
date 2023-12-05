import BottomBar from "./component/common/BottomBar";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
      <BottomBar />
    </BrowserRouter>
  );
};

export default App;
