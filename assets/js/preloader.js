document.body.classList.add('loading');

window.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('.project-image-container'))
        .flatMap(container => JSON.parse(container.dataset.images));

    const video = document.querySelector('.video-background video');
    const mediaToLoad = [];

    // Preload images
    images.forEach(src => {
        const img = new Image();
        const promise = new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
            img.src = src;
        });
        mediaToLoad.push(promise);
    });

    // Preload video
    if (video) {
        const promise = new Promise(resolve => {
            if (video.readyState >= 3) {
                resolve();
            } else {
                video.addEventListener('loadeddata', resolve);
                video.addEventListener('error', resolve);
            }
        });
        mediaToLoad.push(promise);
    }

    Promise.all(mediaToLoad).then(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('loading');
        }, 400); 
    });
});