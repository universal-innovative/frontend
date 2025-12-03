let names = {
  firstName: "akshay",
  lastName: "kumar",
  printFullName: function () {
    console.log(this.firstName + " " + this.lastName);
  },
};
let names2 = {
  firstName: "ravi",
  lastName: "singh",
};

//! call or function borrowing

// inside call we will pass the object that will want to point to this
// we can aslo do the same by keeping reusable function out side of object and calling like

// => printFullName.call(names2)

names.printFullName.call(names2);

// suppose we have multiple arguments in function 'printFullName' then we will pass like => printFullName.call(names2,arg1,arg2)

//!here we need 'apply' method we can pass all the args in array like =>

// printFullName.apply(names2,[arg1,arg2])

//! bind method

// this method binds the required method with the object we use and instead of invoking that method directly we can invoke that method later

let printMyName = names.printFullName.bind(names2);
printMyName();

// example

const person = { name: "Lydia" };

function sayHi(age) {
  return `${this.name} is ${age}`;
}

console.log(sayHi.apply(person, [21]));
console.log(sayHi.bind(person, 21));
