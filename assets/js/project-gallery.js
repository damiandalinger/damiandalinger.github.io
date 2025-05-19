document.addEventListener("DOMContentLoaded", function () {
  const imageContainers = document.querySelectorAll(".project-image-container");

  imageContainers.forEach(container => {
    const images = JSON.parse(container.dataset.images);
    let currentIndex = 0;

    const img = container.querySelector(".project-image");
    const indicators = container.querySelectorAll(".indicator");
    const leftArrow = container.querySelector(".nav-left");
    const rightArrow = container.querySelector(".nav-right");

    function updateImage() {
      img.src = images[currentIndex];
      indicators.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      updateImage();
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateImage();
    }

    function setImage(index) {
      currentIndex = index;
      updateImage();
    }

    updateImage();

    if (leftArrow) leftArrow.addEventListener("click", prevImage);
    if (rightArrow) rightArrow.addEventListener("click", nextImage);

    indicators.forEach((dot, index) => {
      dot.addEventListener("click", () => setImage(index));
    });
  });
});
