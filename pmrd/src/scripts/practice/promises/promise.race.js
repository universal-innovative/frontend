/**
Promise.race() is a static method in JavaScript's Promise object that takes an iterable 
(like an array) of promises as input and returns a single Promise. 
This returned promise settles with the eventual state (either resolved or rejected) of the first promise in the iterable that settles.


   - First to Settle Wins: Promise.race() is like a competition. The outcome of the returned promise is determined 
     by whichever promise in the input iterable resolves or rejects first.
   - Resolution or Rejection: If the first promise to settle resolves, the Promise.race() result will resolve with that promise's value. 
     If the first promise to settle rejects, the Promise.race() result will reject with that promise's reason.
   - Ignoring Others: Once a promise in the iterable settles, the Promise.race() result is determined, 
     and the states of any other promises in the iterable are disregarded.
   - Empty Iterable: If an empty iterable is passed to Promise.race(), the returned promise will remain perpetually pending.
   - Non-Promise Values: If the iterable contains non-promise values or already settled promises, 
     Promise.race() will resolve or reject immediately with the value or reason of the first such item encountered in the iterable.
 */

function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
    if (iterable == null || typeof iterable[Symbol.iterator] !== "function") {
      throw new TypeError("Argument is not iterable");
    }
    const arr = Array.from(iterable);
    if (arr.length === 0) return; // stays pending
    for (let i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i]).then(resolve, reject);
    }
  });
}
