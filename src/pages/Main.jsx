import React from "react";
import me from "../me.png";
import Grid from "../components/Grid.jsx";
import GridCell from "../components/GridCell.jsx";

const Main = () => {
  return (
    <div className="main">
      <div className="img-container">
        <img className="face" src={me} alt="cartoon drawing of Lionel's head" />
      </div>

      <div className="article">
        <h1 className="title">Who Am I?</h1>
        <hr />
        <article>
          <p>
            My name is Lionel. I'm a teacher, developer and life long learner. I
            love to pick up new skills and enrich others with what I know.
          </p>
          <p>
            I enjoy minimalistic and functional design and I love to experiment.
          </p>
          <p>
            I'm currently pursuing opportunities in the tech sector. If you
            think I'd be a good fit for your team or you just want to chat, send
            me an email or message! I'm something of a jack-of-all trades and
            have mostly been trained in full stack development.
          </p>
          <p>
            My main language is Java, but I consider myself a polyglot and I
            love to pickup new languages!
          </p>
          <p>
          <a href="https://drive.google.com/file/d/1tGTH15tK0C8iEFNbLzz44UTKGur-uiqK/view?usp=sharing">Here is a link to my CV</a>. Feel free to take a look! 
          </p>
        </article>
      </div>
    </div>
  );
};

export default Main;
