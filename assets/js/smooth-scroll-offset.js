window.addEventListener('resize', function () {
    const header = document.getElementById('header');
    const links = document.querySelectorAll('a[href^="#"]');
    const offset = header ? header.offsetHeight - 1 : 0;

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = link.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);

            if (target) {
                e.preventDefault();
                const scrollTo = target.offsetTop - offset;
                window.scrollTo({ top: scrollTo, behavior: 'smooth' });
            }
        });
    });
});
window.dispatchEvent(new Event('resize')); 