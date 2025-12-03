/*Primitive types in JS:

string

number 

bigint  -> numbers larger than (2^53 - 1

boolean

undefined -> A variable has been declared but not assigned a value. type is also undefined

symbol  used to create unique identifiers. let sym1 = Symbol("id");

null Represents an intentional absence of value. type is object
 
Characteristics:

Stored directly in memory (stack).

Immutable: you cannot change the actual value, only reassign the variable.

When you copy a primitive, you get a completely new value.*/

/**
Reference types in JS:

Object

Array

Function

Date

RegExp

Map, Set, WeakMap, WeakSet, etc.

Characteristics:

Stored in heap memory. The variable in stack just holds a reference (address).

Mutable: you can modify the contents of the object even if it’s referenced by multiple variables.

When you copy a reference type, you copy the reference, not the actual value.
 */

console.log("REFERNCE TYPE BEHAVIOUR");

let a = { name: "Alice" };
let b = a;
b.name = "Bob";
console.log("a.name", a.name);

let x = [1, 2, 3];
let y = x;
y.push(4);
console.log("x when pushed 4 to y ->", x);

var arr1 = [1, 2, 3];
var arr2 = arr1.slice();
arr2.push(4);
console.log("arr1.slice()", arr1.slice());
console.log("arr1", arr1);
console.log("arr2", arr2);

let obj1 = { a: 10 };
let obj2 = { b: 20 };
let merged = Object.assign({}, obj1, obj2);
merged.a = 3;
console.log("obj1.a", obj1.a);
console.log("merged.a", merged.a);
// Object.assign method copies properties from obj1 and obj2 into a new object

const obj = { key: 1 };
function modify(o) {
  o.key++;
}
modify(obj);
console.log("obj.key", obj.key);
//When obj is passed to the modify function, it’s passed by reference

var arr1 = [{ key: "value1" }];
var arr2 = arr1.slice();
arr2[0].key = "value2";
console.log("arr1[0].key", arr1[0].key);
// slice() method creates a shallow copy of arr1

let m = { num: 1 };
let n = m;
m = { num: 2 };
console.log("n.num", n.num);
// m the memory reference changes. but not for n.

function checkAge(data) {
  //This condition will always return 'false' since JavaScript compares objects by reference, not value.ts(2839)
  if (data === { age: 18 }) {
    console.log("You are an adult");
  } else if (data == { age: 18 }) {
    console.log("You are still an adult");
  } else {
    console.log(`You don't have an age`);
  }
}

checkAge({ age: 18 });

var person = { name: "Manyu" };
const members = [person];
person = {};
console.log("members", members);
// we are reassigning the person object to null its point of refernce changes not for members

function getInfo(member, year) {
  member.name = "Manyu";
  year = "1998";
}

const person3 = { name: "Sarah" };
const birthYear = "1997";
getInfo(person3, birthYear);
console.log("person3, birthYear", person3, birthYear);
// Arguments are passed by value, unless their value is an object,

const food = ["🍕", "🍫", "🥑", "🍔"];
const info = { favoriteFood: "🍝" };
console.log("food", food);
//favoriteFood property on the info object equal to the string
