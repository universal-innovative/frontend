console.log("this is drag and drop utility");

const imageBox = document.querySelector(".imgBox");
const whiteBoxes = document.getElementsByClassName("whiteBox");

imageBox.addEventListener("dragstart", (e) => {
  console.log("dragstart triggered");
  e.target.className += " hold";
  setTimeout(() => {
    e.target.className = "hide";
  }, 0);
});

imageBox.addEventListener("dragend", (e) => {
  console.log("dragend triggered");
  e.target.className = "imgBox";
});

for (box of whiteBoxes) {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
    console.log("dragover triggered");
  });
  box.addEventListener("dragenter", (e) => {
    e.preventDefault();
    e.target.className += " dashed";
    console.log("dragenter triggered");
  });
  box.addEventListener("dragleave", (e) => {
    e.preventDefault();
    e.target.className = "whiteBox";
    console.log("dragleave triggered");
  });
  box.addEventListener("drop", (e) => {
    e.preventDefault();
    console.log("drop triggered");
    e.target.append(imageBox);
  });
}
