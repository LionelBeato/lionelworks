import React from "react";
import tts from "../tts.png";
import el from "../el.png";
import es from "../es.png";
import vc from "../vc.jpg";
import stc from "../static.gif";

const Portfolio = () => {
  return (
    <main className="portfolio">
      <div className="portfolio-grid">
        <div className="portfolio-spread">
          <h1>On The Job</h1>
          <hr />
        </div>
        <div className="portfolio-cell">
          <img src={tts} height="200px" />
          <p>
            I am currently an instructor at <b>Tech Talent South</b>, a coding
            bootcamp designed to give students valuable coding skills. My
            speciality there is Java but I have also taught HTML/CSS, graphQL
            and REST, the Spring Framework, and JavaScript.
          </p>
          <p>
            At Tech Talent South, I took it upon myself to create an extensive
            curriculum for various classNamees. My curriculum covered topics and
            assignments for each and every day, allowing for high student
            engagement.{" "}
            <a href="https://github.com/LionelBeato/coatimundis">
              Here is an example of one of my curriculums.
            </a>
          </p>
        </div>
        <div className="portfolio-cell">
          <img src={es} style={{ padding: "3.6rem" }} />
          <p>
            I have also written documentation and design guidelines for the
            local health-tech startup{" "}
            <a href="https://www.engagement-solutions.com/">
              Engagement Solutions
            </a>
            . They aim to help those in need find social programs. I spearheaded
            the software design and architecture of their major phone app which
            will target all smartphone platforms.
          </p>
        </div>
        <div className="portfolio-spread">
          <h1>Personal</h1>
          <hr />
        </div>

        <div className="portfolio-cell">
          <img src={stc} height="200px" />
          <p>
            <b>
              Bookcase is currently undergoing some major changes... watch this
              space!
            </b>
          </p>
        </div>
        <div className="portfolio-cell">
          <img src={el} height="200px" />
          <p>
            This website is a Progressive Web App or PWA! You can install it on
            any system that supports PWAs like your phone. Why would you want to
            have my personal website as a phone app? I don't know but it sure is
            neat!
          </p>
        </div>
        <div className="portfolio-cell">
          <img src={vc} height="200px" />
          <p>
            <b>Victory Jump</b> is a local art collective that specializes in
            nerdy/geeky culture and fun. I created the company logo and
            branding. I also designed their very first product: a set of enamel
            pins.{" "}
            <a href="https://www.instagram.com/victoryjump/">
              Click here to go to their instagram.
            </a>
          </p>
        </div>
        <div className="portfolio-cell">
          <img src={stc} height="200px" />
          <p>Watch this space for something interesting...</p>
        </div>
      </div>
    </main>
  );
};

export default Portfolio;
