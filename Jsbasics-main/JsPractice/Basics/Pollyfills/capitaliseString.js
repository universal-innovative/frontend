let str = "what is your name";
String.prototype.capitalise1 = function () {
  console.log(this);
  return this.split(" ")
    .map((val) => val.charAt(0).toLocaleUpperCase() + val.slice(1))
    .join(" ");
};
const ans = str.capitalise1();
console.log(ans);
