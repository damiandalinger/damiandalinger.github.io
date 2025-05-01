window.addEventListener("scroll", () => {
    const overlay = document.querySelector(".video-darken-overlay");
    const maxScrollDistance = 800; 

    const scrollY = window.scrollY;
    const opacity = Math.min(scrollY / maxScrollDistance, 0.4); 

    overlay.style.background = `rgba(0, 0, 0, ${opacity})`;
});