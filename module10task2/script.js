let btn = document.querySelector(".j-btn");

btn.addEventListener("click", () => {
  alert(
    "Ширина твоего экрана: " +
      window.screen.width +
      "px" +
      ", " +
      "Высота твоего экрана: " +
      window.screen.height +
      "px."
  );
});
