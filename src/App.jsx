import React from "react";
import Header from "./components/Header.jsx";
import Main from "./pages/Main.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Footer from "./components/Footer.jsx";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div className="grid">
      <Router>
        <Header />
        <Switch>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>

      <Footer />
    </div>
  );
};

export default App;
