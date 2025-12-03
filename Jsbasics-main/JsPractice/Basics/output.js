// Output based questions

// question 1

let students = [
  { name: "ravi", roll: "1", marks: "10" },
  { name: "punit", roll: "3", marks: "20" },
  { name: "ajay", roll: "5", marks: "50" },
  { name: "suneja", roll: "6", marks: "30" },
];

// name of the students in capital letters

const names = students.map((val) => {
  return val.name.toUpperCase();
});

console.log(names);

// questions 2 IIFE bases

(function (x) {
  return (function (y) {
    console.log(x);
  })(2);
})(1);

// function scope o/p based

// for (let i = 0; i < 5; i++) {
//   setTimeout(function () {
//     console.log(i);
//   }, i * 1000);
// }

// closures based questions

function fun() {
  const name = "ravi";
  function display() {
    console.log(name);
  }
  return display;
}
const res = fun();
res();

//Questions=> create a function that allows us to do

function createbase(x) {
  return function (y) {
    return x + y;
  };
}

var addSix = createbase(6);

console.log(addSix(10)); // gives 16
console.log(addSix(21)); //gives 27

// Question => optimise the following code

function find(index) {
  let a = [];
  for (let i = 0; i < 100000; i++) {
    a[i] = i * i;
  }
  console.log(a[index]);
}

console.time("6");
find(6);
console.timeEnd("6");
console.time("50");
find(50);
console.timeEnd("50");

// optimised code below
function find() {
  let a = [];
  for (let i = 0; i < 100000; i++) {
    a[i] = i * i;
  }
  return function (index) {
    console.log(a[index]);
  };
}
const closure = find();
console.time("6");
closure(6);
console.timeEnd("6");
console.time("50");
closure(50);
console.timeEnd("50");

// print only once function
function print() {
  console.log("printed");
}
print();
print();

// changes in above function to print only once
function print() {
  let count = 0;
  return function () {
    if (count != 0) {
      console.log("Already printed");
    } else {
      console.log("printed");
      count++;
    }
  };
  console.log("printed");
}
const newPrint = print();
newPrint();
newPrint();

// output of the following codes

const func = (function (a) {
  delete a;
  return a;
})(5);

console.log(func); //gives 5 as we can not delete local variables.

const obj = {
  a: 1,
  b: 2,
  a: 3,
};
console.log(obj); // gives  { a: 3, b: 2 } ,will override first value of a

// create a function multiplyNumsByTwo that multiplies all numeric values by 2

function multiplyNumsByTwo(nums) {
  for (key in nums) {
    if (typeof nums[key] === "number") {
      nums[key] = nums[key] * 2;
    }
  }
  return nums;
}

let nums = {
  a: 100,
  b: 200,
  title: "ravi",
};

console.log(multiplyNumsByTwo(nums));

// output of the follwing code

const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]); // gives 456
// when we try to assign an object as a key it will be stored as, a[b] = 123=> a["[object object]"]=123 and same for other , so both will be same and second will override first

// output of the follwing code

let person = { name: "ravi" };
const arr = [person]; // value get assigned to 0th index so it won't affect
person = null;
console.log(arr);

const val = { age: 10 };

const multiply = (x = { ...val }) => {
  console.log((x.age *= 2));
};

multiply();
multiply();
multiply(val); // 20 it won't take default value will take actual value(reference) and changes the actual value
multiply(val); //40
