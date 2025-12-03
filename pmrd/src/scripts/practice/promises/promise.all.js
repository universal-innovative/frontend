/**
 * 
Promise.all() is a static method in JavaScript's Promise object, 
designed to handle multiple asynchronous operations concurrently. 
It takes an iterable (commonly an array) of promises and returns a single Promise. 

 - Input: It accepts an array or any iterable of promises. 
   Non-promise values within the iterable are treated as already resolved promises.
 - Resolution: The returned promise resolves when all of the input promises have successfully resolved. 
   The resolved value is an array containing the resolved values of the input promises, in the same order as they were provided.
 - Rejection (Fail-Fast): If any of the input promises reject, Promise.all() immediately rejects with the reason of the first promise that rejected. 
   It does not wait for the remaining promises to settle.
 - Use Cases: It is ideal for scenarios where you need to perform multiple independent asynchronous tasks 
   and require all of them to complete successfully before proceeding with further logic. 
   Examples include fetching data from multiple APIs, loading multiple resources, 
   or performing several database operations concurrently.

     For each iteration Promise object tries to resovle each promise if any of the imput promises rejects
          the function inside .then is skipped and control jumps to rejection handler and rejects with error

          We use Promise.resolve instead of resolve wo that we can safely call .then() and .catch() after it, 
          because it’s guaranteed to be a Promise object. while resole will end the iteration 
          -If it’s already a promise → it reuses/adopts it.
          -If it’s a thenable → it waits for that thenable.
          -If it’s a plain value → it wraps it into a fulfilled promise.
 */

function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    if (iterable == null || typeof iterable[Symbol.iterator] !== "function") {
      // typeof iterable[Symbol.iterator] !== "function" an object is not iterable according to the JavaScript iteration protocol
      throw new TypeError("Argument is not iterable");
    }

    const results = [];
    let completedPromises = 0;
    const arr = Array.from(iterable); // supports any iterable (Set, Map, etc.)
    const total = arr.length;

    if (total === 0) {
      return resolve([]);
    }
    for (let i = 0; i < total; i++) {
      Promise.resolve(arr[i])
        .then((value) => {
          completedPromises++;
          results[i] = value;
          if (completedPromises === total) {
            resolve(results);
          }
        })
        .catch(reject);
    }
  });
}
