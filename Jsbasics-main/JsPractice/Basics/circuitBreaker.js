const testFunction = () => {
  let count = 0;
  return () => {
    count++;
    if (count < 4) {
      throw "failed";
    } else {
      return "hello";
    }
  };
};
const circiutBreaker = (fn, failureCount, thresoldTime) => {
  let failures = 0;
  let timeSinceLastFailure = 0;
  let isClosed = false;
  return (...args) => {
    if (isClosed) {
      const timeDiff = Date.now() - timeSinceLastFailure;
      if (timeDiff > thresoldTime) {
        isClosed = false;
      } else {
        console.error("service unavailable");
        return;
      }
    }
    try {
      const res = fn(...args);
      failures = 0;
      return res;
    } catch (err) {
      failures++;
      timeSinceLastFailure = Date.now();
      if (failures >= failureCount) {
        isClosed = true;
      }
      console.log(err);
    }
  };
};
const t = testFunction();
const c = circiutBreaker(t, 3, 200);
console.log(c()); //fail
console.log(c()); //fail
console.log(c()); //fail
console.log(c()); // unavailable
console.log(c()); // unavailable

// calling c() after 300ms to check if service if working
setTimeout(() => {
  console.log(c());
}, 300);
