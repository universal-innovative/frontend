// 1
// .then() always excepts a call back else it will ignore the passed value and transfer the previous value to the next .then()
Promise.resolve(1)
  .then(() => 2)
  .then(3)
  .then((value) => value * 3)
  .then(Promise.resolve(4))
  .then(console.log);

// 2
Promise.resolve(1)
  .then((val) => {
    console.log(val);
    return val + 1;
  })
  .then((val) => {
    console.log(val);
  })
  .then((val) => {
    console.log(val);
    return Promise.resolve(3).then((val) => {
      console.log(val);
    });
  })
  .then((val) => {
    console.log(val);
    return Promise.reject(4);
  })
  .catch((val) => {
    console.log(val);
  })
  .finally((val) => {
    console.log(val);
    return Promise.resolve(10); // any value returned from .finally will not change the state of promise chain
  })
  .then((val) => {
    console.log(val);
  });

//3
console.log(Boolean("false"));
console.log(Boolean(false));
console.log("3" + 1);
console.log("3" - 1);
console.log("3" - " 02 ");
console.log("3" * " 02 ");
console.log(Number("1"));
console.log(Number("number"));
console.log(Number(null));
console.log(Number(false));

//4
function log(a, b, c, d) {
  console.log(a, b, c, d);
  arguments[0] = "bfe";
  console.log("befor", d);
  arguments[3] = "dev";
  console.log("after", d);

  console.log(a, b, c, d); //bfe,2,3,dev
}

log(1, 2, 3);

//5
[1, 2, 3].reduce((a, b) => {
  console.log(a, b);
});

[1, 2, 3].reduce((a, b) => {
  console.log(a, b);
}, 0);

//6
const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => resolve(p1));
const p3 = Promise.resolve(p1);

console.log(p1 == p2);
console.log(p1 == p3);

//7
const a = [0];
console.log(a.length);
a[3] = 3;
console.log(a.length);
for (let item of a) {
  console.log(item);
}
a.map((item) => {
  console.log(item);
});
a.forEach((item) => {
  console.log(item);
});
console.log(Object.keys(a));

//8
Promise.all([1, 2, Promise.resolve(3), Promise.resolve(4)]).then(
  (value) => {
    console.log(value); //[3,4]
  },
  (error) => {
    console.log(error);
  }
);

//9
const a = 1;
console.log(a); //1

var b;
console.log(b); //2
b = 2;

console.log(c); //undefined
var c = 3;

console.log(d); //error
let d = 2;

//10
var a = 1;

function func() {
  a = 2;
  console.log(a);
  var a;
}
func();
console.log(a);
if (!("b" in window)) {
  var b = 1;
}
console.log(b);

// 11
const obj = {
  a: 1,
  b() {
    return this.a;
  },
};
const obj2 = {
  a: 2,
  b() {
    return this.a;
  },
};
console.log((true ? obj.b : a)());
console.log((true ? obj.b.bind(obj) : a)());
console.log(true ? obj.b() : a);
console.log(true ? obj.b.call(obj2) : a);
console.log((3, obj["b"]));

//12
Promise.resolve(1)
  .finally((data) => {
    console.log(data);
    return Promise.reject("error");
  })
  .catch((error) => {
    console.log(error);
    throw "error2";
  })
  .finally((data) => {
    console.log(data);
    return Promise.resolve(2).then(console.log);
  })
  .then(console.log)
  .catch(console.log);
//finally does not receive the resolved value of the previous promise.
// and aslo dose not change the state of previous state

//13
console.log(1);

setTimeout(() => {
  console.log(2);
}, 10);
setTimeout(() => {
  console.log(3);
}, 0);

new Promise((_, reject) => {
  console.log(4);
  reject(5);
  console.log(6);
})
  .then(() => console.log(7))
  .catch(() => console.log(8))
  .then(() => console.log(9))
  .catch(() => console.log(10))
  .then(() => console.log(11))
  .then(console.log)
  .finally(() => console.log(12));
console.log(13);

//14
const obj3 = {
  foo: "bar",
};

console.log(obj3.foo.length);
console.log(obj3.foo["length"]);

console.log(["foo"] in obj3);

//15
const obj4 = {
  msg: "BFE",
  foo() {
    console.log(this.msg);
  },
  bar() {
    console.log("dev");
  },
};

(obj4.foo || obj4.bar)(); //
(obj4.bar || obj4.foo)(); //
(obj4.foo.bind(obj4) || obj4.bar)(); //
