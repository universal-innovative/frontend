function delayLog(val, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(val);
    }, delay);
  });
}

(async function () {
  console.log(1);
  await delayLog(2, 1000).then((res) => console.log(res));
  console.log(3);
  await delayLog(4, 2000).then((res) => console.log(res));
})();

// second question
function delay(val) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(val);
    }, val * 1000);
  });
}
async function test() {
  console.log("started");
  for (let i = 0; i < 5; i++) {
    const res = await delay(i);
    console.log(res);
    // await delay(i).then((res) => console.log(res));
  }
  console.log("ended");
}
console.log("test strated");
test();
console.log("test ended");
