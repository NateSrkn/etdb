import React from "react";

export const Backdrop = ({ backdrop, children, type }) => {
  const backdropLoad = (backdrop) => {
    if (!backdrop) return;
    return {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    };
  };
  const classes = () => {
    if (type === "feature") return "root feature";
    return "root";
  };
  return (
    <div className={classes()} style={backdropLoad(backdrop)}>
      <div className="gradient-bg">{children}</div>
    </div>
  );
};
