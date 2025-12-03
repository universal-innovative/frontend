import React, { useMemo, useState } from "react";
import debouncedSearch from "../utils/debounce";
import throttledFunction from "../utils/throttle";

const Search = () => {
  const [toggleState, setToggleState] = useState("Debounce");
  const [searchText, setSearchText] = useState("");
  const handleChange = (value) => {
    setSearchText(value);
  };

  //   const debouncedHandler = debouncedSearch((e) => {
  //     const value = e.target.value;
  //     handleChange(value);
  //   }, 2);
  // useMemo ensures the same debounced function is used across renders
  const toggleHandler = () => {
    if (toggleState === "Debounce") {
      setToggleState("Throttle");
    } else {
      setToggleState("Debounce");
    }
  };
  const debouncedHandler = useMemo(
    () =>
      debouncedSearch((e) => {
        const value = e.target.value;
        handleChange(value);
      }, 2),
    []
  );
  const throttledHandler = useMemo(
    () =>
      throttledFunction((e) => {
        const value = e.target.value;
        handleChange(value);
      }, 2000),
    []
  );

  return (
    <div>
      <h2>{searchText}</h2>
      <input
        type="text"
        onChange={
          toggleState === "Debounce" ? debouncedHandler : throttledHandler
        }
      ></input>
      <div>
        <button
          style={{
            marginTop: "8px",
          }}
          onClick={toggleHandler}
        >
          {toggleState}
        </button>
      </div>
    </div>
  );
};

export default Search;
