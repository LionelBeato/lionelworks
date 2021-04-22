import React from "react";
import "../styles/Abra.css";
import stc from "../static.gif";

const Abra = () => {
  return (
    <main className="case-grid-comp">
      <h1 className="case-title">Abra: a case study</h1>
      <section className="case-grid-cell">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias fuga
        ipsum saepe inventore fugiat nulla unde nam fugit at, placeat
        asperiores, tempora iste odit distinctio voluptate excepturi. Sit,
        deleniti ad?
      </section>
      <section className="case-grid-cell">
        <img src={stc}></img>
      </section>
      <h2 className="case-title">Process</h2>
      <section className="case-grid-cell">
        <img src={stc}></img>
      </section>
      <section className="case-grid-cell">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias fuga
        ipsum saepe inventore fugiat nulla unde nam fugit at, placeat
        asperiores, tempora iste odit distinctio voluptate excepturi. Sit,
        deleniti ad?
      </section>
    </main>
  );
};

export default Abra;
