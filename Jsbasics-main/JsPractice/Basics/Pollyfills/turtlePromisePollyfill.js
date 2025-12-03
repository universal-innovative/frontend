const promise1 = new Promise((res, rej) => {
  setTimeout(() => {
    res("resolve1");
  }, 5000);
});
const promise2 = new Promise((res, rej) => {
  setTimeout(() => {
    res("resolve2");
  }, 2000);
});
const promise3 = new Promise((res, rej) => {
  setTimeout(() => {
    res("resolve3");
  }, 3000);
});

Promise.turtle = function (promises) {
  const res = [];
  let count = 0;
  return new Promise((res, rej) => {
    promises.forEach((promise) => {
      promise.then((val) => {
        count++;
        if (count === promises.length) {
          res(val);
        }
      });
    });
  });
};

Promise.turtle([promise1, promise2, promise3]).then((res) => console.log(res));
