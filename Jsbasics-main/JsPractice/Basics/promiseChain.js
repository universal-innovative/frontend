const first = new Promise((res, rej) => {
  res("first!");
});
const second = new Promise((res, rej) => {
  res(first);
});

second
  .then((res) => {
    return res;
  })
  .then((res) => console.log(res));
