if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('scroll-position', window.scrollY);
    });

    window.addEventListener('load', () => {
        const savedScrollY = localStorage.getItem('scroll-position');
        if (savedScrollY !== null) {
            window.scrollTo(0, parseInt(savedScrollY));
            localStorage.removeItem('scroll-position');
        }
    });
}