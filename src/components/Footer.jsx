import React from "react";

const Footer = () => {
  const cacheName = "v1.0.24";

  return (
    <footer className="foot">
      <span>made with ❤️ in hartford, ct</span>
      <br />
      <span>
        Copyright &copy; Lionel Beato 2020 <b id="version">{cacheName}</b>
      </span>
    </footer>
  );
};

export default Footer;
