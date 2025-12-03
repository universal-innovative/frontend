/**
  to access the object a method can use this keyword
  The value of this is the object “before dot”, the one used to call the method.
  The value of this is evaluated during the run-time, depending on the context.

  In a regular function call (not attached to an object), this defaults to the global object 
  (window in browsers, global in Node.js) in non-strict mode, 
  and to undefined in strict mode.

  If in event handler it will refer to the element that triggered the even handler
  Functions do not get their own this automatically in JavaScript.
  
  if the inside a method in an object to use the object itself we use this, 
  the this keyword will refer to the object which is calling the method


  In Javascript "this" is free eavluated as runtime, the method can be reused for different objects
  but flexibility creates more possibilies for mistakes.

  this is not determined by where it appears in your code —
  it’s determined by how the surrounding function is called.
 */
function makeUser() {
  return {
    name: "John",
    ref: this,
  };
}

let user = makeUser();

console.log(user.ref.name);
// here the surrounding function is bound to window global or undefined,

function makeUser2() {
  return {
    name: "John",
    ref() {
      return this;
    },
  };
}
let user2 = makeUser2();
console.log(user2.ref().name);
// here the surrounding function is ref called by the returned object with filed name value 'Jphm

let calculator = {
  read(a, b) {
    this.a = a;
    this.b = b;
  },
  sum() {
    return this.a + this.b;
  },
  mul() {
    return this.a * this.b;
  },
};

calculator.read(2, 3);
console.log(calculator.sum());
console.log(calculator.mul());
