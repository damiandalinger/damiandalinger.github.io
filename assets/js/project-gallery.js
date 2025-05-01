document.addEventListener("DOMContentLoaded", function () {
    const imageContainers = document.querySelectorAll(".project-image-container");

    imageContainers.forEach(container => {
        const images = JSON.parse(container.dataset.images);
        let currentIndex = 0;

        const img = container.querySelector(".project-image");
        const indicators = container.querySelectorAll(".indicator");

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

        function setImage(index) {
            currentIndex = index;
            updateImage();
        }

        updateImage();
        
        img.addEventListener("click", nextImage);
        indicators.forEach((dot, index) => {
            dot.addEventListener("click", () => setImage(index));
        });
    });
});