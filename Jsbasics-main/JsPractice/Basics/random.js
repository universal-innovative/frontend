// for (var i = 0; i < 5; i++) {
//   var btn = document.createElement("button");
//   btn.appendChild(document.createTextNode("Button " + i));
//   btn.addEventListener("click", function () {
//     console.log(i);
//   });
//   document.body.appendChild(btn);
// }
// will print 5 on every button click
// for (var i = 0; i < 5; i++) {
//   var btn = document.createElement("button");
//   btn.appendChild(document.createTextNode("Button " + i));
//   btn.addEventListener(
//     "click",
//     (function (i) {
//       return function () {
//         console.log(i); //closoure logic
//       };
//     })(i)
//   );
//   document.body.appendChild(btn);
// }
// will print coresponding i value on click

//->next ......//

var d = {};
["zebra", "horse"].forEach(function (k) {
  d[k] = undefined;
});
console.log(d);
// { zebra: undefined, horse: undefined }

//->next ......//

for (var i = 0; i < 5; i++) {
  function fun(i) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  }
  fun(i);
}
