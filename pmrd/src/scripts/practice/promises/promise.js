let promise = new Promise(function (resolve, reject) {
  // executor (run automatically and immediately)
  // - resolve(value) = if the job is finshed successfully, with result value.
  // - reject(error) = if an error is occured, error is the error object.
});

/**
 
When the executor obtains the result, be it soon or late, doesn’t matter, it should call one of these callbacks:

resolve(value) — if the job is finished successfully, with result value.
reject(error) — if an error has occurred, error is the error object.
So to summarize: the executor runs automatically and attempts to perform a job. When it is finished with the attempt, 
it calls resolve if it was successful or reject if there was an error.

The promise object returned by the new Promise constructor has these internal properties:

state — initially "pending", then changes to either "fulfilled" when resolve is called or "rejected" when reject is called.
result — initially undefined, then changes to value when resolve(value) is called or error when reject(error) is called.
So the executor eventually moves promise to one of these states:
 */

let promiseDone = new Promise(function (resolve, reject) {
  resolve("done");
  reject(new Error("..."));
  setTimeout(() => resolve("..."));
  //The idea is that a job done by the executor may have only one result or an error.
  // Also, resolve/reject expect only one argument (or none) and will ignore additional arguments.
  //The properties state and result of the Promise object are internal. We can’t directly access them.
  // We can use the methods .then/.catch/.finally for that. They are described below.
});

let promiseWithThen = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("done!", 1000));
});
promiseWithThen.then(
  (result) => console.log(result),
  (error) => console.log(error)
);

/**
 * 
  if we are intersed only in completion we can provide only one funtion argument to .then
  if interested only in errors, then we can use null as the first argument as the first argument: .then(null, errorHandlingFunction). 
  Or we can use .catch(errorHandlingFunction)
  The call .finally(f) is similar to .then(f,f) in the sense that f runs always, when the promise is settled: be it resolve or reject
  We can use it setup handler for performing cleanup/finalizing after the previous operations are complete. 
  eg stopping loading indicators, closing no longer needed connections.
  A finally handler doesn’t get the outcome of the previous handler (it has no arguments). This outcome is passed through instead, to the next suitable handler.
  If a finally handler returns something, it’s ignored.
  When finally throws an error, then the execution goes to the nearest error handler.
 */
new Promise((resolve, reject) => {
  setTimeout(() => resolve("value"), 2000);
})
  .finally(() => console.log("Promise finally ready")) // triggers first
  .then((result) => console.log(result)); // <-- .then shows "value"
new Promise((resolve, reject) => {
  throw new Error("error");
})
  .finally(() => console.log("Promise ready")) // triggers first
  .catch((err) => console.log(err)); // <-- .catch shows the error

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(3000).then(() => console.log("Run after 3 seconds"));
