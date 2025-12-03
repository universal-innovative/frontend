// Given an object which can have a function as a value at a nested level, create a function that will accept arguments as input and pass it through all the functions in the input object and return the computed value.

const obj = {
  a: {
    b: (a, b, c) => a + b + c,
    c: (a, b, c) => a + b - c,
  },
  d: (a, b, c) => a - b - c,
};

print(obj)(1, 1, 1); //should give { a: { b: 3, c: 1 }, d: -1 }
console.log(obj);

function print(obj) {
  return function (...arguments) {
    for (key in obj) {
      let val = obj[key];
      if (typeof val == "function") {
        obj[key] = val(...arguments);
      } else obj[key] = print(val)(...arguments);
    }
      return obj
  };
}
