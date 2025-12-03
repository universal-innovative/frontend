document.querySelector("#grandParent").addEventListener(
  "click",
  () => {
    console.log("grand parent clicked");
  },
  false
);
// either we pass false are keep it empty it behaves same (as bubbling)
document.querySelector("#parent").addEventListener(
  "click",
  () => {
    console.log("parent clicked");
  },
  false
);
document.querySelector("#child").addEventListener(
  "click",
  () => {
    console.log("child clicked");
  },
  false
);
const btn = document.querySelector("button");

const random = (num) => {
  return Math.floor(Math.random() * (num + 1));
};

// method-1

// btn.addEventListener("click", () => {
//   const randomColor = `rgb(${random(255)},${random(255)},${random(255)})`;
//   document.body.style.backgroundColor = randomColor;
// });

// method-2

// function randomColor(e) {
//   const randomColor = `rgb(${random(255)},${random(255)},${random(255)})`;
//   document.body.style.backgroundColor = randomColor;
// }
// btn.onclick = randomColor;

// method-3

btn.onclick = (e) => {
  console.log(e);
  const randomColor = `rgb(${random(255)},${random(255)},${random(255)})`;
  // document.body.style.backgroundColor = randomColor;
  e.target.style.backgroundColor = randomColor;
};

// getting key that is pressed

const inputBox = document.querySelector("#input");
const outputDiv = document.querySelector("#output");

inputBox.addEventListener("keydown", (e) => {
  outputDiv.textContent = `You pressed ${e.key}`;
});
