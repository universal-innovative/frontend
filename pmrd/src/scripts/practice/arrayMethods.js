if (!Array.prototype.myMap) {
  Array.prototype.myForEach = function (cb, thisArgs) {
    console.log("this my foreacch", this);
    if (typeof cb !== "function")
      throw new TypeError(cb + " is not a function");
    for (let i = 0; i < this.length; i++) {
      cb.call(thisArgs, this[i], i, this);
    }
  };
}

[1, 2].myForEach((el, i, arr) => {
  console.log(el, i, arr);
});

if (!Array.prototype.myMap) {
  Array.prototype.myMap = function (cb, thisArgs) {
    let result = [];
    console.log("this my map", this);
    if (typeof cb !== "function")
      throw new TypeError(cb + " is not a function");
    for (let i = 0; i < this.length; i++) {
      const res = cb.call(thisArgs, this[i], i, this);
      result.push(res);
    }
    return result;
  };
}

const fromMyMap = [1, 2].myMap((el, i, arr) => {
  return el * (i + 1);
});

console.log("from my map", fromMyMap);

if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function (cb, thisArgs) {
    let result = [];
    console.log("this my map", this);
    if (typeof cb !== "function")
      throw new TypeError(cb + " is not a function");
    for (let i = 0; i < this.length; i++) {
      if (cb.call(thisArgs, this[i], i, this)) {
        result.push(this[i]);
      }
    }
    return result;
  };
}

const fromMyFilter = [1, 2, 3, 4, 5].myFilter((el, i, arr) => {
  return el > 3;
});
console.log("from my filter", fromMyFilter);

if (!Array.prototype.myReduce) {
  Array.prototype.myReduce = function (cb, intialValue) {
    if (typeof cb !== "function")
      throw new TypeError(cb + ", is not a function");
    const arr = this;
    let acc = intialValue;
    for (let i = 0; i < this.length; i++) {
      acc = acc ? cb(acc, this[i]) : this[i];
    }
    return acc;
  };
}

const fromMyReduce = [1, 2, 3, 4, 5].myReduce((a, b) => {
  return a + b;
}, 0);
console.log("from my Reduce", fromMyReduce);
