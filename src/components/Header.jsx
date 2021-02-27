import React from "react";
import el from "../el.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Header = () => {

  return (
    <nav className="head">
      <Link to="/">
        <img
          className="logo"
          src={el}
          style={{ height: `3rem` }}
          alt="A stylized L serving as a logo"
        />
      </Link>
      <Link id="portfolio" to="/portfolio">
        portfolio
      </Link>
      <div id="links">
        <a href="http://twitter.com/lionelbeato">
          <i className="fab fa-twitter fa-lg"></i>
        </a>
        <a className="un" href="http://twitter.com/lionelbeato">
          Twitter
        </a>
        <a href="http://github.com/lionelbeato">
          <i className="fab fa-github fa-lg"></i>
        </a>
        <a className="un" href="http://github.com/lionelbeato">
          GitHub
        </a>
        <a href="http://linkedin.com/in/lionelbeato">
          <i className="fab fa-linkedin fa-lg"></i>
        </a>
        <a className="un" href="http://linkedin.com/in/lionelbeato">
          LinkedIn
        </a>
        <a href="mailto:beato@lionel.works">
          <i className="fas fa-at fa-lg"></i>
        </a>
        <a className="un" href="mailto:beato@lionel.works">
          email
        </a>
      </div>
    </nav>
  );
};

export default Header;
