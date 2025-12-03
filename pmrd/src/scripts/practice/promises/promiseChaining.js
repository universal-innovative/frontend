/*
 The result is passed through the chain of .then handlers.
 The whole thing works, because every call to a .then returns a new promise, 
 so that we can call the next .then on it.
 .then() automatically wraps your return value in a resolved Promise.
*/

new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    console.log("first then", result * 2);
    return result * 2;
  })
  .then(function (result) {
    console.log("second then", result);

    return result * 2;
  })
  .then(function (result) {
    console.log("third then", result);
    return;
  });
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    console.log("second then", result);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    console.log("third then", result);
    return;
  });

/**
   
  Network request to a url return a promise. This promise resolves with response object when the remote
  server responds with headers, before the full response is downloaded

  Steps involved
   1 The browser sends an HTTP reqeust to the remote server fetch() immediately returs a Promise (pending state)
   2 Promise resolves when server responds with HTTP headers Ther response object This object includes the headers and a stream (not the actual data yet).
      Response {
        status: 200,
        headers: Headers {},
        body: ReadableStream, // <-- data still streaming!
      }
   3 This response object has response.text() response.json() response.blob() methods
     We can attach other .then and call one of the methods as per our requirement

   */
fetch("https://dummyjson.com/products")
  .then((response) => {
    console.log("Headers received!", response);
    return response.json();
  })
  .then((data) => {
    console.log("Full body received:", data);
    return 5;
  })
  .then((value) => {
    console.log("fetch last then value", value);
  });

/**
    // Error handling with promises
    When a promise rejects, the control jumps to closest rejection handler.

The code of a promise executor and promise handlers has an “invisible try..catch” around it.
 If an exception happens, it gets caught and treated as a rejection.

    
*/
new Promise(function (resolve, reject) {
  setTimeout(() => {
    // throw new Error("Whoops!");
  }, 1000);
}).catch(alert);

/**
  The error is thrown in the global scope (not inside the Promise executor anymore).
  No one catches it.
  It becomes an uncaught error, not a Promise rejection.
 */
