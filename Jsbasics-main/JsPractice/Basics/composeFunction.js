function addFive(x) {
  return x + 5;
}
function substractTwo(x) {
  return x - 2;
}
function multiplyFive(x) {
  return x * 5;
}

function compose(...functions) {
  function ans(args) {
    return functions.reduceRight((arg, fn) => fn(arg), args);
  }
  return ans;
}

const result = compose(addFive, substractTwo, multiplyFive); //will calculate from right
console.log(result(5)); //should give 28 5*5-2+5
