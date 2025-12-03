const arr = [1, 2, 3, 4, 5];

const arr1 = arr.reduce((acc, curr) => {
  console.log("acc-", acc, "curr-", curr);
  return acc + curr;
}, 0);

console.log(arr1);

// question
// Get object value from string path
const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

function get(obj, path) {
  if (!path.length || path == "") return undefined;
  if (Array.isArray(path)) {
    path = path.join(".");
  }
  const newPath = [];
  for (let i = 0; i < path.length; i++) {
    if (path[i] != "[" && path[i] != "." && path[i] != "]") {
      newPath.push(path[i]);
    }
  }
  const value = newPath.reduce((acc, path) => {
    // console.log("acc-", acc, "curr-", path);
    return acc[path];
  }, obj);
  return value;
}
console.log(get(obj, "a.b.c"));
console.log(get(obj, "a.b.c.0"));
console.log(get(obj, "a.b.c[1]"));
console.log(get(obj, "a.b.c[3]"));
