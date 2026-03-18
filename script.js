// Hamburger Menu Logic
const menuBtn = document.getElementById('menu-btn');
const navOverlay = document.getElementById('nav-overlay');
const navLinks = document.querySelectorAll('.nav-link');
let menuOpen = false;

function toggleMenu() {
    if(!menuOpen) {
        menuBtn.classList.add('open'); navOverlay.classList.add('active');
        menuOpen = true; document.body.style.overflow = 'hidden'; 
    } else {
        menuBtn.classList.remove('open'); navOverlay.classList.remove('active');
        menuOpen = false; document.body.style.overflow = 'auto';
    }
}
menuBtn.addEventListener('click', toggleMenu);
navLinks.forEach(link => link.addEventListener('click', toggleMenu));

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if(window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

// Dynamic Go To Top Button Logic
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

// Typing Effect
const roles = ["Front-End Developer.", "Linux Enthusiast.", "IT Support Specialist."];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typingElement = document.getElementById("typing-text");

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1); charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1); charIndex++;
    }
    let speed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 500;
    }
    setTimeout(typeEffect, speed);
}
typeEffect();

// --- Web3Forms Submission Logic ---
const form = document.getElementById('contact-form');
if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        // Your specific API Key
        formData.append("access_key", "88c00d6a-06f7-4f00-a5cd-4eefc80fef1a");

        const originalHTML = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.cursor = 'not-allowed';

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert("Success! Your message has been sent directly to Aariz.");
                form.reset();
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            alert("Something went wrong. Please check your internet connection and try again.");
        } finally {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            submitBtn.style.cursor = 'pointer';
        }
    });
}

// Scroll Animations (Intersection Observer)
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.anim-fade-up, .anim-slide-left, .anim-slide-right, .anim-scale');
animatedElements.forEach((el) => observer.observe(el));

// --- Particle Network Background Animation ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
let particlesArray;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    initParticles();
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x; this.y = y; this.directionX = directionX;
        this.directionY = directionY; this.size = size; this.color = color;
    }
    draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color; ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX; this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        let color = i % 2 === 0 ? 'rgba(0, 255, 204, 0.5)' : 'rgba(184, 41, 255, 0.4)'; 
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = particlesArray[a].color.replace(/[\d\.]+\)$/g, `${opacityValue})`);
                ctx.lineWidth = 1; ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) particlesArray[i].update();
    connectParticles();
}
initParticles(); animateParticles();
