let arr = [
  [1, 2],
  [3, 4, 5],
  [6, [7, 8], [9, 1, [2, 3], 4, 5]],
];

const flatArray = (arr) => {
  let ans = [];
  arr.forEach((val) => {
    if (Array.isArray(val)) {
      let ar = flatArray(val);
      ans.push(...ar);
    } else ans.push(val);
  });
  return ans;
};

console.log(flatArray(arr));
