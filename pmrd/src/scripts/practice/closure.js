function outer() {
  let x = 10; // in outer’s Lexical Environment
  function inner() {
    console.log(x); // needs x
  }
  return inner;
}

const f = outer(); // outer EC popped from stack
f();

for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("from var timeout", i);
  }, 0);
}
for (var i = 0; i < 3; i++) {
  setTimeout(
    (function (i) {
      console.log("from iffe timeout", i);
    })(i), //IIFE executes immediately during the loop,
    10000
  );
}
for (var i = 0; i < 3; i++) {
  setTimeout(
    (function (i) {
      return function () {
        console.log("from iffe timeout without closure", i);
      };
    })(i), // IIFE captures i and returns a function, which is what setTimeout executes later.
    1000
  );
}
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("from let timeout", i);
  }, 0);
}

function createBase(baseNumber) {
  return function (N) {
    return baseNumber + N;
  };
}

var addSix = createBase(6);
console.log(addSix(10));
console.log(addSix(1));

function counter() {
  var _counter = 0;
  return {
    add: function (increment) {
      _counter += increment;
    },
    retrieve: function () {
      return "The counter is currently at: " + _counter;
    },
  };
}

var c = counter();

console.log(c.add(5));
console.log(c.add(9));
console.log(c.retrieve());

function wrapper1() {
  let count = 0;
  return () => {
    count++;
    console.log("count", count);
  };
}

const increment1 = wrapper1();
increment1();
increment1();
function wrapper2() {
  let count = 0;

  count++;
  console.log("count without closure", count);
}
wrapper2();
wrapper2();

function wrapper3() {
  let _count = 0;
  function implement(val) {
    _count += val;
  }
  return {
    increment: () => {
      implement(1);
    },
    decrement: () => {
      return implement(-1);
    },

    getValue: () => {
      return _count;
    },
  };
}

const obj = wrapper3();
obj.decrement();
obj.increment();
obj.increment();
obj.increment();
console.log("obj.getValue()", obj.getValue());

function fn(str) {
  let index = 0;
  return {
    next: function () {
      if (index > str.length - 1) {
        return "length exceeded";
      }
      return str[index++];
    },
  };
}

const fun = fn("test");
console.log("fun.next()", fun.next());
console.log("fun.next()", fun.next());
console.log("fun.next()", fun.next());
console.log("fun.next()", fun.next());
console.log("fun.next()", fun.next());
console.log("fun.next()", fun.next());
console.log("fun.next()", fun.next());
console.log("fun.next()", fun.next());
console.log("fun.next()", fun.next());
