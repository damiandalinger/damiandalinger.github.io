window.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = link.getAttribute('href').slice(1);
            let scrollTarget;

            if (targetId === 'about') {
                scrollTarget = document.querySelector('.about-wrapper');
            } else if (targetId === 'projects') {
                scrollTarget = document.querySelector('.project-wrapper');
            } else {
                scrollTarget = document.getElementById(targetId);
            }

            if (scrollTarget) {
                e.preventDefault();

                const elementRect = scrollTarget.getBoundingClientRect();
                const absoluteElementTop = elementRect.top + window.scrollY;

                window.scrollTo({
                    top: absoluteElementTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
