// ==========================================
// Ana Hilda Imóveis - JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Preloader ----
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 1600);
    });
    // Fallback: hide preloader after 3s even if load event already fired
    setTimeout(() => preloader.classList.add('hidden'), 3000);

    // ---- Header scroll ----
    const header = document.getElementById('header');
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---- Mobile menu ----
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const spans = menuToggle.querySelectorAll('span');
        if (nav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.querySelectorAll('span').forEach(s => {
                s.style.transform = '';
                s.style.opacity = '';
            });
        });
    });

    // ---- Hero Slider ----
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    if (slides.length > 1) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // ---- Counter Animation ----
    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;

    const animateCounters = () => {
        if (countersStarted) return;
        countersStarted = true;

        counters.forEach(counter => {
            const target = +counter.closest('[data-count]').dataset.count;
            const duration = 2000;
            const start = performance.now();

            const step = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                counter.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(step);
                else counter.textContent = target;
            };

            requestAnimationFrame(step);
        });
    };

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        const statsObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.disconnect();
            }
        }, { threshold: 0.3 });
        statsObserver.observe(statsBar);
    }

    // ---- Finance Tabs ----
    const tabs = document.querySelectorAll('.finance-tab');
    const panels = document.querySelectorAll('.finance-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.getElementById('panel-' + tab.dataset.tab);
            if (panel) panel.classList.add('active');
        });
    });

    // ---- Scroll Animations ----
    const animateElements = document.querySelectorAll(
        '.caixa-card, .service-card, .tip-card, .property-card, .contact-card, .about-feature, .finance-cta-card, .finance-item, .finance-step, .cost-card, .blog-card, .stat-item'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const siblings = Array.from(entry.target.parentElement.children);
                const delay = siblings.indexOf(entry.target) * 80;
                setTimeout(() => entry.target.classList.add('visible'), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Section-level fade-in
    const sectionElements = document.querySelectorAll(
        '.section-header, .about-visual, .about-text, .caixa-banner, .cta-content, .finance-cta'
    );

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    sectionElements.forEach(el => {
        el.classList.add('fade-in');
        sectionObserver.observe(el);
    });

    // ---- Active Nav on Scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightNav = () => {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
