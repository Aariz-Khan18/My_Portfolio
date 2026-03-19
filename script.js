// --- Global Elements ---
const globalLoader = document.getElementById('global-loader');
const loaderText = document.querySelector('.loader-text');

// --- 1. Initial Loading Screen ---
window.addEventListener('load', () => {
    setTimeout(() => {
        globalLoader.classList.add('hidden');
    }, 1500); 
});

// --- 2. Theme Switcher Logic with Custom Loading Sentences ---
const themes = ['default', 'hacker', 'synthwave'];
let currentThemeIndex = 0;
const themeBtn = document.getElementById('theme-btn');

// Check saved theme on load
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
    currentThemeIndex = themes.indexOf(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
}

themeBtn.addEventListener('click', () => {
    // Spin icon on click
    themeBtn.style.transform = "rotate(180deg)";
    setTimeout(() => { themeBtn.style.transform = "rotate(0deg)"; }, 300);

    // Calculate new theme
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    
    // Set custom deployment sentence based on theme
    let themeMessage = "";
    if (newTheme === 'hacker') {
        themeMessage = "> Injecting Matrix Protocol... Hacker Theme Deploying 🟩";
    } else if (newTheme === 'synthwave') {
        themeMessage = "> Booting Retro Drive... Synthwave Theme Deploying 🟪";
    } else {
        themeMessage = "> Restoring Core System... Cyberpunk Theme Deploying 🟦";
    }

    // Show loader with new message
    loaderText.textContent = themeMessage;
    globalLoader.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Wait for screen to cover, then swap theme
    setTimeout(() => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        initParticles(); // Update particle colors
        
        // Hide loader after theme is applied
        setTimeout(() => {
            globalLoader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Reset loader text back to default for navigation clicks
            setTimeout(() => {
                loaderText.textContent = "> Aariz Portfolio is Loading...";
            }, 500);
        }, 800);

    }, 500); // Quick transition
});

// --- 3. UI/UX Custom Cursor Logic ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

document.querySelectorAll('a, button, .social-box, .card, .menu-btn, input, textarea, #theme-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(184, 41, 255, 0.1)';
        cursorOutline.style.borderColor = 'var(--neon-accent)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.borderColor = 'var(--neon-purple)';
    });
});

// --- 4. Hamburger Menu Logic ---
const menuBtn = document.getElementById('menu-btn');
const navOverlay = document.getElementById('nav-overlay');
const navLinks = document.querySelectorAll('.nav-link');
let menuOpen = false;

function toggleMenu() {
    if(!menuOpen) {
        menuBtn.classList.add('open'); navOverlay.classList.add('active');
        menuOpen = true; 
    } else {
        menuBtn.classList.remove('open'); navOverlay.classList.remove('active');
        menuOpen = false; 
    }
}
menuBtn.addEventListener('click', () => {
    toggleMenu();
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
});

// --- 5. Enhanced Nav Link Logic (Trigger Loader) ---
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); 
        const targetId = link.getAttribute('href');
        
        if(menuOpen) { toggleMenu(); }

        // Ensure default text is set
        loaderText.textContent = "> Aariz Portfolio is Loading...";
        globalLoader.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            document.querySelector(targetId).scrollIntoView({ behavior: 'auto' });
            
            setTimeout(() => {
                globalLoader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 600); 
        }, 800); 
    });
});

// --- 6. Header Scroll Effect & Side Animated Progress Bar ---
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if(window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    const scrollProgress = document.getElementById('scroll-progress');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progressHeight = (window.scrollY / totalHeight) * 100;
    if(scrollProgress) scrollProgress.style.height = progressHeight + "%";
});

// --- 7. Dynamic Go To Top Button Logic ---
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});
scrollTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- 8. Typing Effect ---
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

// --- 9. Web3Forms Submission Logic ---
const form = document.getElementById('contact-form');
if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
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
                alert("Thank you for connecting! 🚀 Your message has successfully reached my terminal. I will get back to you very soon.");
                form.reset();
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            alert("Something went wrong. Please check your internet connection and try again.");
        } finally {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            submitBtn.style.cursor = 'none'; 
        }
    });
}

// --- 10. Scroll Animations (Intersection Observer) ---
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.anim-fade-up, .anim-slide-left, .anim-slide-right, .anim-scale');
animatedElements.forEach((el) => observer.observe(el));

// --- 11. Particle Network Background Animation ---
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
    
    // Dynamic Particle Colors Based on Theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
    let color1, color2;
    
    if (currentTheme === 'hacker') {
        color1 = 'rgba(0, 255, 0, 0.5)';
        color2 = 'rgba(0, 136, 0, 0.4)';
    } else if (currentTheme === 'synthwave') {
        color1 = 'rgba(255, 170, 0, 0.5)'; 
        color2 = 'rgba(255, 0, 127, 0.4)';  
    } else { 
        color1 = 'rgba(0, 255, 204, 0.5)';
        color2 = 'rgba(184, 41, 255, 0.4)';
    }

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        let color = i % 2 === 0 ? color1 : color2; 
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
                                                              
