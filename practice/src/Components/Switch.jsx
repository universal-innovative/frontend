import React from "react";

const Switch = ({ layoutState, setLayoutState }) => {
  const switchHandler = () => {
    setLayoutState((prev) => {
      switch (prev) {
        case "H":
          setLayoutState("V");
          break;
        case "V":
          setLayoutState(null);
          break;
        case null:
          setLayoutState("H");
          break;
        default:
          setLayoutState("H");
      }
    });
  };
  console.log("layout state", layoutState);
  return (
    <>
      <button className="switch-button" onClick={switchHandler}>
        {layoutState || "N"}
      </button>
    </>
  );
};

export default Switch;
