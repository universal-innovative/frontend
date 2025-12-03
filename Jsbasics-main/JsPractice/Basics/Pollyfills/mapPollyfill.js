// map,filter,reduce

// pollyfill for map
// Array.map((num,i,arr)=>{})

Array.prototype.myMap = function (cb) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(cb(this[i], i, this));
  }
  return res;
};

const arr = [1, 2, 3, 4, 5];

const arr1 = arr.myMap((val, i, arr1) => {
  return val * 2;
});

console.log(arr1);

// pollyfill for filter
// Array.filter((val)=>{})

// Array.prototype.myFilter = function (cb) {
//   const res = [];
//   for (let i = 0; i < this.length; i++) {
//     if (cb(this[i])) {
//       res.push(this[i]);
//     }
//   }
//   return res;
// };
// const arr3 = [1, 2, 3, 4, 5];

// const arr2 = arr3.myFilter((val) => {
//   return val > 2;
// });
// console.log(arr2);

// pollyfill for reduce
// Array.reduce((acc,curr,i,arr)=>{},0)

Array.prototype.myReduce = function (cb, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
  }
  return accumulator;
};

const arr4 = [1, 2, 3, 4, 5];

const reducedArr = arr4.myReduce((acc, curr, i, arr4) => {
  return acc + curr;
}, 0);

console.log(reducedArr);
