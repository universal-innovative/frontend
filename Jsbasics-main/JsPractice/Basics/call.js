// // function getName() {
// //   return `${this.name} ${this.lastName}`;
// // }

// // let student = {
// //   name: "ravi",
// //   lastName: "kanaujiya",
// //   age: "23",
// //   getName: getName(this), //this will not work because 'this' will created only after we write a function inside object
// // };

// // console.log(student.getName);

// //to make function 'getName' reusable  we can do it like below

// let student2 = {
//   name: "ravi",
//   lastName: "kanaujiya",
//   age: "23",
//   getName: function (abc, abc2) {
//     return ` ${abc} ${abc2} ${this.name} ${this.lastName}`;
//   },
// };

// // function getName() {
// //   return `${this.name} ${this.lastName}`;
// // }

// // let student3 = {
// //   name: "ravi2",
// //   lastName: "kanaujiya2",
// //   age: "24",
// // };
// // console.log(getName.call(student3));

// let student3 = {
//   name: "ravi2",
//   lastName: "kanaujiya2",
//   age: "24",
// };

// console.log(student2.getName.call(student3, ["abc", "abc2"]));

// const delayAndLog = async () => {
//   console.log("A");
//   await sleep(5000);
//   console.log("B");
// };

// const sleep = (ms) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("resolved");
//     }, ms);
//   });
// };
// delayAndLog();

let arr = [2, 4, 6, 10, 2, 1];
function findMinSubArray(arr, k) {
  let i = 0,
    j = 0,
    sum = 100,
    n = arr.length;
  while (j < n) {
    sum += arr[j];
    if (sum < k) {
      console.log("inside while ", sum);
      j++;
    } else if (sum === k) {
      ans = min(ans, j - i + 1);
      j++;
    } else if (sum > k) {
      while (sum > k) {
        sum -= arr[i++];
      }
    }
  }
  return sum;
}

const res = findMinSubArray(arr, 12);
console.log(res);
