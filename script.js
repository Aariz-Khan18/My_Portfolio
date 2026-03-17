// Hamburger Menu Logic
const menuBtn = document.getElementById('menu-btn');
const navOverlay = document.getElementById('nav-overlay');
const navLinks = document.querySelectorAll('.nav-link');
let menuOpen = false;

function toggleMenu() {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        navOverlay.classList.add('active');
        menuOpen = true;
        document.body.style.overflow = 'hidden'; 
    } else {
        menuBtn.classList.remove('open');
        navOverlay.classList.remove('active');
        menuOpen = false;
        document.body.style.overflow = 'auto';
    }
}

menuBtn.addEventListener('click', toggleMenu);
navLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if(window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Typing Effect
const roles = ["Front-End Developer.", "Linux Enthusiast.", "IT Support Specialist."];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing-text");

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}
typeEffect();

// Advanced Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.anim-fade-up, .anim-slide-left, .anim-slide-right, .anim-scale');
animatedElements.forEach((el) => observer.observe(el));

