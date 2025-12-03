function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  // console.log('curr',currentIndex)
  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining elements

    randomIndex = Math.floor(Math.random() * currentIndex);
    // console.log('ind',randomIndex)
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Used like so
var arr = [2, 11, 37, 42];
shuffle(arr);
// console.log(arr);

let a = 4,
  b = 6;
[a, b] = [b, a];
// console.log(a, b);

const arr1 = [1, 2, [3, 4], 5, [6, 7, [8, 9, 10], 11, 12], 13];

function flat(arr) {
  const res = [];
  arr.forEach((val) => {
    if (Array.isArray(val)) {
      return [...res, ...flat(arr)];
    }
    return val;
  });
  return res;
}

const flattenArray = flat(arr1);
console.log(flattenArray);
