function makeCounter() {
  let count = 0;

  function counter() {
    count++;
    return count;
  }
  return counter();
}

// const counter1 = makeCounter();
// console.log(counter1()); // 1
// console.log(counter1()); // 2
// console.log(counter1()); // 3
console.log(makeCounter());
console.log(makeCounter());
console.log(makeCounter());
