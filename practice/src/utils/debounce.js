"use strict";
const debouncedSearch = (fn, delay) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args); // <-- now runs after delay
    }, delay * 1000);
  };
};

export default debouncedSearch;
