import React from "react";
import Accordion from "../Components/Accordion";
const items = [
  { title: "Section 1", content: "Content for section 1" },
  { title: "Section 2", content: "Content for section 2" },
  { title: "Section 3", content: "Content for section 3" },
];

const AccordionList = () => {
  return (
    <div>
      {items.map((item) => {
        return <Accordion title={item.title} content={item.content} />;
      })}
    </div>
  );
};

export default AccordionList;
