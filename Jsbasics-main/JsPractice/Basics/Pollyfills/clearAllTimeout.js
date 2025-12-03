const originalSetTimeout = window.setTimeout;
const timerIds = [];

window.setTimeout = (cb, delay) => {
  const id = originalSetTimeout(cb, delay);
  timerIds.push(id);
  return id;
};

setTimeout(() => {
  console.log(1);
}, 10);
setTimeout(() => {
  console.log(2);
}, 10);

const clearAllTimeout = (timerIds) => {
  for (id of timerIds) {
    window.clearTimeout(id);
  }
};
clearAllTimeout(timerIds);
console.log(timerIds);
