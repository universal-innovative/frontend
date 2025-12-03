const stars = document.querySelectorAll(".star");

let clickedStar = -1;

const handleStarClick = (e) => {
  clickedStar = e.target.getAttribute("key");
  stars.forEach((star, ind) => {
    if (ind <= clickedStar) {
      star.style.opacity = "100%";
    } else {
      star.style.opacity = "50%";
    }
  });
};

stars.forEach((star, ind) => {
  star.addEventListener("click", handleStarClick);
});
