import { Route, Routes } from "react-router-dom";
import Home from "./component/product/Home";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/product/list" exact element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
