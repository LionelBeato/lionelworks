import React from "react";
import GridCell from "./GridCell.jsx";

const Grid = ({ children }) => {
  const style = {
    grid: {
      position: `relative`,
      minHeight: `100vh`,
      display: `grid`,
      gridTemplateColumns: `1fr 1fr 1fr 1fr 1fr`,
      gridTemplateRows: `1fr auto 1fr`,
    },
  };

  return <div className="grid-comp">{children}</div>;
};

export default Grid;
