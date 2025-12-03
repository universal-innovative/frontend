let sum = 0;
function calculate(n) {
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
}

function efficient(fun) {
  let cache = {};
  function abc(...args) {
    let val = args[0];
    if (val in cache) {
      console.log("in cache");
      return cache[val];
    } else {
      console.log("calculating first time");
      let res = calculate(val);
      cache[val] = res;
      return res;
    }
  }
  return abc;
}
let minimise = efficient(calculate);

console.log(minimise(5));
console.log(minimise(5));

let str = "aba";
function fun(str) {
  console.log(str.split("").reverse().join(""));
  return str === str.split("").reverse().join("");
}
console.log(fun(str));
