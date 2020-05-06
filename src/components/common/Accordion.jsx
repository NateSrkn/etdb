import React, { useState, useRef } from "react";

export const Accordion = ({ title, children, ...props }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [height, setHeight] = useState("0px");

  const content = useRef(null);

  function toggleAccordion() {
    setIsToggled(!isToggled);
    setHeight(isToggled ? "0px" : `${content.current.scrollHeight}px`);
  }

  return (
    <div className="accordion" {...props}>
      <button
        className={`accordion_toggle ${isToggled && "active"}`}
        onClick={toggleAccordion}
      >
        <p className="accordion__title">{title}</p>
        {/* <Chevron className="accordion__icon" width={10} fill={"#777"} /> */}
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content"
      >
        {children}
      </div>
    </div>
  );
};
