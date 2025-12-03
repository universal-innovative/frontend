const obj = {
  name: "Ravi",
  age: 24,
};
function printName(arg) {
  console.log(`My name is ${this.name} and age is ${this.age} ${arg}`);
}
const obj2 = {
  name: "Punit",
  age: 23,
};

// pollyfill for call
Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error("not callable");
  }
  context.fn = this;
  context.fn(...args);
};
printName.myCall(obj2, 2);

//pollyfill for apply
Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error("eerrr");
  }
  if (!Array.isArray(args)) {
    throw new Error("err");
  }
  context.fn = this;
  context.fn(...args);
};
printName.myApply(obj2, 1);

// pollyfill for bind
Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error("eeerrr");
  }
  context.fn = this;
  return function (...newArgs) {
    return context.fn(...args, ...newArgs);
  };
};
const fn = printName.myBind(obj);
fn(1);
