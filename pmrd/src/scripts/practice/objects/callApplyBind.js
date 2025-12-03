console.log("CALL-------------------");
const person = {
  firstName: "John",
  lastName: "Doe",
  fullName: function (val) {
    return this.firstName + " " + this.lastName + (val || "");
  },
};

const anotherPerson = {
  firstName: "Jane",
  lastName: "Smith",
};

console.log(person.fullName.call(anotherPerson, "no"));
console.log(person.fullName.call(anotherPerson));

var status = "😎";
setTimeout(() => {
  const status = "😍";
  const data = {
    status: "🥑",
    getStatus() {
      return this.status;
    },
  };

  console.log("data.getStatus()", data.getStatus());
  console.log("data.getStatus.call(this)", data.getStatus.call(this));
}, 0);

function init(x, y) {
  this.x = x;
  this.y = y;
  return x; // if not returned the output is undefined, if in strict throws exception
}
var point = {};
console.log("init.call(point, 3,4)", init.call(point, 3, 4));
init.call(point, 3, 4);

var point = {
  x: null,
  y: null,
  init(x, y) {
    this.x = x;
    this.y = y;
  },
};
var anotherPoint = {};
point.init.call(anotherPoint, 5, 6);
console.log("anotherPoint.x", anotherPoint.x);
console.log("anotherPoint.y", anotherPoint.y);

var Point = function (x, y) {
  this.x = x;
  this.y = y;
};
var point = new Point(3, 4);
console.log("new point.x", point.x);
console.log("new point.y", point.y);

console.log("APPLY-------------------");
const numbers = [5, 10, 15, 20];
function sum(a, b, c, d) {
  return a + b + c + d;
}

console.log(
  "// Using apply() to pass the array of numbers",
  sum.apply(null, numbers)
);

console.log("BIND-------------------");

const module = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const unBoundGetX = module.getX;
console.log("// The function gets invoked at the global scope", unBoundGetX());

const boundGetX1 = unBoundGetX.bind(module);
const boundGetX2 = module.getX.bind(module);
console.log("unBoundGetX.bind(module)->", boundGetX1());
console.log("module.getX.bind(module)->", boundGetX2());

function multiply(a, b, c) {
  return a * b * c;
}

const multiplyByTwo = multiply.bind(null, 2);
console.log("multiplyByTwo(3,4)", multiplyByTwo(3, 4));

console.log("COMPARE-------------------");

const person1 = {
  name: "Alice",
  sayHello: function (greeting) {
    return `${greeting}, ${this.name}`;
  },
};

const anotherPerson1 = { name: "Bob" };
console.log(
  "person.sayHello.call(anotherPerson, 'Hi')->",
  person1.sayHello.call(anotherPerson1, "Hi")
);
console.log(
  "person.sayHello.apply(anotherPerson, ['Hello'])->",
  person1.sayHello.apply(anotherPerson1, ["Hello"])
);

const sayHelloToBob = person1.sayHello.bind(anotherPerson1, "Hey");
console.log(
  'sayHelloToBob= person.sayHello.bind(anotherPerson, "Hey")->',
  sayHelloToBob()
);

console.log("person1.sayHello()->", person1.sayHello());
console.log("person1.sayHello('hi')->", person1.sayHello("hi"));

console.log(
  'person.sayHello.bind(person, "Yo")()->',
  person1.sayHello.bind(person1, "Yo")()
);
console.log(
  'person.sayHello.call(person, "Yo")->',
  person1.sayHello.call(person1, "Yo")
);
console.log(
  'person.sayHello.apply(this, "Yo")->',
  person1.sayHello.call(this, "Yo")
);

// POLYFILLS

if (!Function.prototype.myCall) {
  Function.prototype.myCall = function (context, ...args) {
    // step1 check the execution point type
    if (typeof this !== "function")
      throw new TypeError("myCall on non-function");
    // step2 Box to object
    context = context == null ? globalThis : Object(context);

    // step3 use unique key
    const fnKey = Symbol("fn");
    //  attach the function temporarily
    context[fnKey] = this;

    // call it as method
    const result = context[fnKey](...args);
    // deleted remove the temporary property:
    return result;
  };
}

if (!Function.prototype.myApply) {
  Function.prototype.myApply = function (context, args) {
    if (typeof this !== "function")
      throw new TypeError("myApply on non-function");
    context = context == null ? globalThis : Object(context);

    const fnKey = Symbol("fn");
    context[fnKey] = this;
    let result;
    if (args == null) {
      return context[fnKey]();
    } else {
      context[fnKey]();
      if (!Array.isArray(args)) {
        throw new TypeError("arguments should be array");
      }
      result = context[fnKey](...args);
    }
    delete context[fnKey];
    return result;
  };
}
Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this; // the function being bound
  return function (...callArgs) {
    return fn.myApply(context, [...boundArgs, ...callArgs]);
  };
};
