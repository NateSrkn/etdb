import React from "react";

export const GridList = ({ data, component: Component, type }) => {
  return (
    <div className="grid-list">
      {data.map((row) => (
        <div className="grid-item" key={row.id}>
          <Component row={row} type={type} />
        </div>
      ))}
    </div>
  );
};
