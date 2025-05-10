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
        const videoPromise = new Promise(resolve => {
            let resolved = false;

            const done = () => {
                if (!resolved) {
                    resolved = true;
                    resolve();
                }
            };
            setTimeout(done, 1500);

            if (video.readyState >= 3) {
                done();
            } else {
                video.addEventListener('loadeddata', done, { once: true });
                video.addEventListener('error', done, { once: true });
            }
        });

        mediaToLoad.push(videoPromise);
    }
    
    const failSafe = new Promise(resolve => setTimeout(resolve, 5000));
    Promise.race([
        Promise.all(mediaToLoad),
        failSafe
    ]).then(() => {
        document.body.classList.remove('loading');
    });
});
