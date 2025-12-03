// Accordion
// Build an accordion component that a displays a list of vertically stacked sections with each containing a title and content snippet
import React, { useState } from "react";

const Accordion = ({ title, content }) => {
  const [render, setRender] = useState(false);
  const toggle = () => {
    setRender((prev) => !prev);
  };
  return (
    <div>
      <button className="title" onClick={toggle}>
        {title}
      </button>
      {render ? (
        <div className={"content-box " + render ? "active" : "in-active"}>
          <span>{content}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Accordion;
