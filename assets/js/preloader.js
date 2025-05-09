document.body.classList.add('loading');

window.addEventListener('load', () => {
    const images = Array.from(document.querySelectorAll('.project-image-container'))
        .flatMap(container => {
            try {
                return JSON.parse(container.dataset.images);
            } catch {
                return [];
            }
        });

    const video = document.querySelector('.video-background video');
    const mediaToLoad = [];

    // Load the images
    images.forEach(src => {
        const img = new Image();
        const promise = new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
            img.src = src;
        });
        mediaToLoad.push(promise);
    });

    // Load the video
    if (video) {
        const promise = new Promise(resolve => {
            const done = () => {
                video.play().catch(() => { });
                resolve();
            };

            if (video.readyState >= 3) {
                done();
            } else {
                video.addEventListener('loadeddata', done, { once: true });
                video.addEventListener('error', done, { once: true });
            }
        });
        mediaToLoad.push(promise);
    }

    Promise.all(mediaToLoad).then(() => {
        setTimeout(() => {
            document.body.classList.remove('loading');
        });
    });
});