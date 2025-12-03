const throttledFunction = (cb, delay) => {
  let lastCall = 0;
  return (...args) => {
    setTimeout(() => {
      let currentCall = Date.now();
      if (lastCall === 0 || currentCall - lastCall > delay) {
        cb(...args);
      }
    }, delay);
  };
};

export default throttledFunction;
