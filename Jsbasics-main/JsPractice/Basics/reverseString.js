// reverser all words in string

let str = "my name is ravi";

const reverseStr = str.split(" ").map((word) => {
  return word.split("").reverse().join("");
});
// console.log(reverseStr);

Array.prototype.myMap = function (cb) {
  const result = [];
  for (let i = 0; i < this.length; i += 1) {
    result.push(this[i] * 2);
  }
  return result;
};

const arr = [1, 2, 3, 4, 5];
const newArr = arr.myMap((val, i, arr) => {
  return val * 2;
});
console.log(newArr);
