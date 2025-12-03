function print(text, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(text);
    }, time);
  });
}
function myPromiseAll(promises) {
  let result = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          result.push(res);
          if (index === promises.length - 1) {
            resolve(result);
          }
        })
        .catch((err) => reject(err));
    });
  });
}
Promise.all([print("ravi", 1000), Promise.resolve("hello")]).then((val) => {
  console.log(val);
});
myPromiseAll([print("ravi", 1000), Promise.resolve("hello")]).then((val) => {
  console.log(val);
});
// if any one of the promise get faliled complete promise will fail

