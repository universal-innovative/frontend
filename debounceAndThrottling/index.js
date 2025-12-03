const input = document.querySelector("input");
const defaultSpan = document.getElementById("default");
const debounceSpan = document.getElementById("debounce");
const throttleSpan = document.getElementById("throttle");

const updateDebounceText = debounce((text) => {
  debounceSpan.textContent = text;
});
const updateThrottleText = throttle((text) => {
  throttleSpan.textContent = text;
});

input.addEventListener("input", (e) => {
  defaultSpan.textContent = e.target.value;

  updateDebounceText(e.target.value);
  updateThrottleText(e.target.value);
});

function debounce(cb, delay = 1000) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(args);
      console.log("args", args);
    }, delay);
  };
}

function throttle(cb, delay = 1000) {
  let shouldWait = false;

  return function (...args) {
    if (shouldWait) return;
    cb(args);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}
