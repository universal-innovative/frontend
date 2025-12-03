const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise1");
  }, 100);
});
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise2");
  }, 200);
});
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise3");
  }, 300);
});

// pollyfill for Promise.all

Promise.myAll = function (promises) {
  const result = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise, ind) => {
      promise
        .then((res) => {
          count++;
          result[ind] = res;
          if (count == promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

Promise.myAll([promise1, promise2, promise3]).then((res) => {
  console.log(res);
});
