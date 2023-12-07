import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUpPage from "./SignUpPage";
import SignUpCompletePage from "./SignUpCompletePage";
import LoginPage from "./LoginPage";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/signup" component={SignUpPage} />
                <Route path="/signup-complete" component={SignUpCompletePage} />
                <Route path="/login" component={LoginPage} />
                {/* 다른 페이지들의 Route도 필요에 따라 추가 */}
            </Switch>
        </Router>
    );
};

export default App;