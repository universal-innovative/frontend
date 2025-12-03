function groupBy(arr, keyFinder) {
  const obj = {};
  for (val of arr) {
    const key =
      typeof keyFinder === "function" ? keyFinder(val) : val[keyFinder];
    if (key in obj) {
      obj[key] = [...obj[key], val];
    } else {
      obj[key] = [val];
    }
  }
  return obj;
}
function groupBy2(arr, keyFinder) {
  const res = arr.reduce((acc, curr) => {
    const key =
      typeof keyFinder === "function" ? keyFinder(curr) : curr[keyFinder];
    console.log(acc);
    if (key in acc) {
      acc[key] = [...acc[key], curr];
    } else {
      acc[key] = [curr];
    }
    return acc;
  }, {});
  return res;
}
console.log(groupBy([6.1, 4.2, 6.3], Math.floor));
console.log(groupBy2(["one", "two", "three"], "length"));
