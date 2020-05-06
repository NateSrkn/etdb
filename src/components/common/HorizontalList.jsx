import React from "react";

export const HorizontalList = ({ data, component: Component, type }) => {
  return (
    <ul className="grid-shelf">
      {data.map((row) => (
        <li className="grid-item" key={row.id}>
          <Component row={row} type={type} />
        </li>
      ))}
    </ul>
  );
};
