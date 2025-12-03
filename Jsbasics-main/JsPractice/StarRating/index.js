
let stars = document.getElementsByTagName("a");
let inPutBox = document.querySelector("input");

function addingListenerToStar() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener("click", () => {
      for (let j = 0; j < stars.length; j++) {
        if (j <= i) stars[j].style.opacity = "100%";
        else stars[j].style.opacity = "50%";
      }
      inPutBox.style.visibility = "visible";
    });
  }
}

addingListenerToStar();
