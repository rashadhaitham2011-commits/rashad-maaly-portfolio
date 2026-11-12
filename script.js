// Typing Animation Logic
const typingText = document.getElementById('typing-text');
const titlesAr = ["مصمم جرافيك إبداعي", "مونتير فيديوهات احترافي", "خبير هويات بصرية", "صانع محتوى رقمي"];
const titlesEn = ["Creative Graphic Designer", "Professional Video Editor", "Visual Identity Expert", "Digital Content Creator"];

let isEnglish = false;
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const titles = isEnglish ? titlesEn : titlesAr;
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Mobile Menu Toggle Logic
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Language Switcher Logic
const langBtn = document.getElementById('lang-btn');
const html = document.documentElement;

langBtn.addEventListener('click', () => {
    isEnglish = !isEnglish;

    if (isEnglish) {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        langBtn.textContent = 'AR';
    } else {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        langBtn.textContent = 'EN';
    }

    // Update all text with data attributes
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = isEnglish ? el.getAttribute('data-en') : el.getAttribute('data-ar');
    });
});

// Theme Toggle Logic
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');

    const icon = themeBtn.querySelector('i');
    if (body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Portfolio Filter Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.work-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Modal Lightbox Logic with Zoom
const modal = document.getElementById('projectModal');
const modalContainer = document.getElementById('modalContainer');
let currentScale = 1;

function openModal(src, type) {
    modalContainer.innerHTML = '';
    currentScale = 1;

    if (type === 'image') {
        const img = document.createElement('img');
        img.src = src;
        img.id = 'modalMedia';
        modalContainer.appendChild(img);
    } else if (type === 'video') {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.id = 'modalMedia';
        modalContainer.appendChild(video);
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function zoomImage(factor) {
    const media = document.getElementById('modalMedia');
    if (media) {
        currentScale *= factor;
        media.style.transform = `scale(${currentScale})`;
    }
}

function resetZoom() {
    currentScale = 1;
    const media = document.getElementById('modalMedia');
    if (media) {
        media.style.transform = `scale(1)`;
    }
}

function closeModalDirect() {
    modal.classList.remove('active');
    modalContainer.innerHTML = '';
    document.body.style.overflow = 'auto';
}

function closeModal(event) {
    if (event.target === modal) {
        closeModalDirect();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModalDirect();
    }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});
