// 1. frist use case of closoures

// let count=0
// function increment() {
//     count++;
// }
// increment()
// increment()

// below is code where we have count variable as a private variable .(using closoures)

// function wrapper() {
//   let count = 0;
//   return () => {
//     count++;
//     console.log(count);
//   };
// }
// const increment = wrapper();

// increment();
// increment();

// 2. Second use case of closoures

// function wrapper() {
//   let _count = 0;

//   function implement(val) {
//     _count += val;
//   }
//   return {
//     increment: () => {
//       implement(1);
//     },
//     decrement: () => {
//       return implement(-1);
//     },
//     getValue: () => {
//       return _count;
//     },
//   };
// }
// const obj = wrapper();

// obj.decrement();
// obj.increment();
// obj.increment();

// console.log(obj.getValue());
// const arr = [
//   [1, 2],
//   [3, 4],
//   [5, 6],
// ];

function fn(str) {
  let index = 0;
  return {
    next: function () {
      if (index > str.length - 1) {
        return "length exceded";
      }
      return str[index++];
    },
  };
}
const fun = fn("test");

console.log(fun.next());
console.log(fun.next());
console.log(fun.next());
console.log(fun.next());
console.log(fun.next());
