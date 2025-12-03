function myDebounce(cb, delay) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => {
      cb.apply(args);
    }, delay);
  };
}
function myThrottle(cb, delay) {
  let lastCalled = 0;
  return (...args) => {
    setTimeout(() => {
      const currCall = Date.now();
      if (lastCalled === 0 || currCall - lastCalled > delay) {
        lastCalled = currCall;

        cb.apply(this, args);
      }
    }, delay);
  };
}

const debouncedClickHandler = myThrottle(clickHanlder, 1000);

function clickHanlder() {
  console.log("clicked");
}
const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
  debouncedClickHandler("text");
});
