/**
  The word "async" before a function means one simple thing: a function always returns a promise. 
  Other values are wrapped in resolved promise automatically.

  The key word await makes JavaScript wait until that promise settles and return its result. 
 */

async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });
  let result = await promise;
  console.log(result);
}
f();

/**
  await literally suspends the function execution until the promise settles, 
  and then resumes it with the promise result. That doesn't cost any CPU resources, 
  because JavaScript engine can do other jobs in the meantime: execute other scripts, handle events, etc
  
  If a promise resolves normally, then await promise returns the result. But in case of a rejection
  it throws the error, just as if there were a throw statement at that line.

  We can catch that error using try..catch, the same way as a regular throw:

  If we forget to add .catch there, then we get an unhandled promise error (viewable in the console).
   We can catch such errors using a global unhandledrejection event handler.


   Together they provide a great framework to write asynchronous code that is easy to both read and write.

        With async/await we rarely need to write promise.then/catch, 
        but we still shouldn’t forget that they are based on promises, 
        because sometimes (e.g. in the outermost scope) we have to use these methods. 
        Also Promise.all is nice when we are waiting for many tasks simultaneously.
 */
