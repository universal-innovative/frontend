/*

 Promise.allSettled() is a static method in JavaScript that takes an iterable of Promises as input and returns a single Promise. 
 This returned Promise fulfills when all of the input Promises have "settled," meaning they have either resolved (fulfilled) or rejected. 
 
 - Waits for all Promises to Settle: Unlike Promise.all(), which short-circuits and rejects immediately if any of the input Promises reject, 
   Promise.allSettled() waits for every Promise in the iterable to reach a settled state, whether fulfilled or rejected.
 - Returns an Array of Outcome Objects: The Promise returned by Promise.allSettled() always fulfills with an array. 
   Each element in this array is an object describing the outcome of a corresponding input Promise.
 - Outcome Object Structure: Each outcome object in the returned array has a status property, 
   which can be either "fulfilled" or "rejected".
   If the status is "fulfilled", the object will also have a value property containing the resolved value of that Promise.
   If the status is "rejected", the object will have a reason property containing the rejection reason of that Promise.
*/

function promiseAllSettled(iterable) {
  return new Promise((resolve, reject) => {
    if (!iterable || typeof iterable[Symbol.iterable] !== "function") {
      throw new Error("Argument is not iterable");
    }

    let results = [];
    let arr = Array.from(iterable);
    let total = arr.length;

    for (let i = 0; i < total; i++) {
      Promise.resolve(s[i])
        .then((value) => {
          results[i] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[i] = { status: "rejected", reason };
        });
    }
    resolve(results);
  });
}
