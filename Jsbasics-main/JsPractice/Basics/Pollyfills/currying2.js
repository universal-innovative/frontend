function add(...args) {
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum += args[i];
  }
  return sum;
}

function sum2(...args) {
  let res = 0;
  return (...args2) => {
    if (args2.length) {
      return sum2(...args, ...args2);
    } else {
      return (res += add(...args));
    }
  };
}

console.log(sum2(10, 20, 30)(40, 50)());
