import React from "react";
import Header from "./components/Header.jsx";
import Main from "./pages/Main.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Footer from "./components/Footer.jsx";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Grid from "./components/Grid.jsx";
import Abra from "./pages/Abra.jsx";

const App = () => {
  return (
    <Grid>
      <Router>
        <Header />
        <Switch>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/abra">
            <Abra />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </Grid>
  );
};

export default App;
