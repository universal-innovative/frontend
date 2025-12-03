/**
 Promise.any() is a static method in JavaScript that takes an iterable of Promises as input and returns a single Promise. 
 This returned Promise fulfills as soon as the first of the input Promises fulfills, with that Promise's value. 
 If all of the input Promises reject, then the returned Promise rejects with an AggregateError, 
 which is a new subclass of Error that groups together the individual errors from all the rejected Promises. 

   - Resolves on first fulfillment: It "short-circuits" and resolves as soon as any of the provided Promises successfully resolve, 
     ignoring any subsequent fulfillments or rejections from other Promises in the iterable.
   - Rejects if all reject: If every Promise in the input iterable rejects, Promise.any() will reject.
   - AggregateError for rejections: When all Promises reject, the rejection value is an AggregateError 
     containing an array of all the individual rejection reasons.
   - Use case: It is particularly useful when you need to get the result from the fastest-resolving operation among a set of asynchronous tasks, 
     such as fetching data from multiple sources and using the first one that responds.
 */
function promiseAny(iterable) {
  return new Promise((resolve, reject) => {
    if (iterable == null || typeof iterable[Symbol.iterator] !== "function") {
      throw new TypeError("Argument is not iterable");
    }

    const arr = Array.from(iterable);
    const total = arr.length;

    if (total === 0) {
      return reject(new AggregateError([], "All promises were rejected"));
    }

    const errors = new Array(total);
    let rejectedCount = 0;

    for (let i = 0; i < total; i++) {
      Promise.resolve(arr[i])
        .then(resolve) // first fulfillment wins, outer promise settles
        .catch((reason) => {
          errors[i] = reason;
          rejectedCount++;
          if (rejectedCount === total) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    }
  });
}
