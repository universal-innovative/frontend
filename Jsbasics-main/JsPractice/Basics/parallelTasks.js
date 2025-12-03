// function to create async functions

function createAsyncTask() {
  const value = Math.floor(Math.random() * 3);
  return function (cb) {
    setTimeout(() => {
      cb(value);
    }, value * 1000);
  };
}
const createAsyncTaskWithPromise = () => {
  const val = Math.floor(Math.random() * 10);
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (val < 5) {
        res(val);
      } else {
        rej(val);
      }
    }, 1000);
  });
};
// we need to pass callback because we can not access return value form setTimout just after it is called , so we need a call back to print the print pr to store the value
// const async1 = function (cb) {
//   setTimeout(() => {
//     cb(1);
//   }, 100);
// };
// const async2 = function (cb) {
//   setTimeout(() => {
//     cb(2);
//   }, 200);
// };
// const async3 = function (cb) {
//   setTimeout(() => {
//     cb(3);
//   }, 300);
// };

const asyncTasks = [createAsyncTask(), createAsyncTask(), createAsyncTask()];

function runAsyncTasksInParallel(tasks) {
  const res = [];
  tasks.forEach((task) => {
    task((val) => {
      res.push(val);
      if (res.length >= tasks.length) {
        console.log(res);
      }
    });
  });
}
function runInParallelPromises(tasks, cb = console.log) {
  const suc = [];
  const err = [];
  let count = 0;
  tasks.forEach((task, ind) => {
    task
      .then((res) => {
        suc.push(res);
      })
      .catch((er) => err.push(er))
      .finally(() => {
        count++;
        if (count >= tasks.length) {
          // console.log(suc);
          // console.log(err);
          cb(suc);
          cb(err);
        }
      });
  });
}

runAsyncTasksInParallel(asyncTasks);
