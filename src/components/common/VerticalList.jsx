import React from "react";

export const VerticalList = ({ data, component: Component, type }) => {
  return (
    <ul className="vertical-list">
      {data.map((row) => (
        <li className="vertical-card" key={row.id}>
          <Component row={row} type={type} />
        </li>
      ))}
    </ul>
  );
};
