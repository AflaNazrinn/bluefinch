document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Preloader and Initial Body Scroll Lock
    const preloader = document.querySelector('.preloader');
    document.body.style.overflow = 'hidden'; // Prevents scrolling while loading

    // Simulate loading time similar to a luxury theme transition
    setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.style.overflow = ''; // Restore scrolling
    }, 2200);

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fade up animations on scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.section-heading, .service-card, .features-list li, .check-list li, .tag');
    
    // Initial state setup for fade elements
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const countAnimationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stagger logic based on a data attribute or simple sequential execution could be added
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        countAnimationObserver.observe(el);
    });
});
