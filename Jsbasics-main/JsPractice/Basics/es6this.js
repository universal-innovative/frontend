// ES6 introduced class syntax for defining constructor functions and methods in a more structured manner.

class MyClass {
  constructor(val) {
    this.name = val;
  }
  printValue() {
    console.log(this.name);
  }
}
const newObj = new MyClass("ravi");
newObj.printValue();

// Arrow functions introduced in ES6 do not have their own this context. Instead, they inherit the this value from their enclosing (lexical) context.

function fun() {
  setTimeout(() => {
    console.log(this);
  }, 1000);
}

// ES6 introduced shorthand method definitions in object literals, which allows you to define methods without using the function keyword.

const ob2 = {
  data: 2,
  printData() {
    console.log(this.data);
  },
};
