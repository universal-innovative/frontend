//using calls backs decreses our code quality because of two reasons
// 1. call back hell
// 2.inversion of control

// thats why we use Promises

// promise is an object that represents the eventual completion of an async operation

// const cart = ["shoes", "pants", "kurta"];
// const promise = createOrder(cart); //orderId

// promise.then(function (orderId) {
//   proceedToPayment(orderId);
// });
// function proceedToPayment(orderId) {
//   console.log(orderId);
// }

// function validateCart() {
//   return true;
// }

// function createOrder(cart) {
//   const pr = new Promise(function (resolve, reject) {
//     // creating promise
//     if (!validateCart(cart)) {
//       const err = new Error("cart is not valid");
//       reject(err);
//     }
//     const orderId = "1234";
//     setTimeout(() => {
//       //adding fake delay
//       resolve(orderId);
//     }, 5000);
//   });
//   return pr;
// }

// output bases questions

1;

console.log("start");

const promise1 = new Promise((resolve, reject) => {
  console.log("1");
  resolve(2);
});
promise1.then((res) => console.log(res));
console.log("end");

// output

// start;
// 1;
// end;
// 2;
// if there is no resolve in promise then '.then' block will never execute
