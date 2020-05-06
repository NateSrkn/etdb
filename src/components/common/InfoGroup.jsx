import React from "react";

export const InfoGroup = ({ title, children, style }) => {
  return (
    <div className="group" style={style}>
      {title && <div className="sub-title">{title}</div>}
      {children}
    </div>
  );
};
