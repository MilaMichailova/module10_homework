const btn = document.querySelector(".j-btn");
const iconLite = document.querySelector(".bi-arrow-down-left-circle");
const iconBold = document.querySelector(".bi-arrow-down-left-circle-fill");

btn.addEventListener("click", () => {
  iconLite.classList.toggle("hide");
  iconBold.classList.toggle("hide");
});
