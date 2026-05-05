// Main JavaScript for Portfolio

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Mobile Navigation Toggle ==========
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu') || document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        const navItems = document.querySelectorAll('.nav-item, .nav-btn');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const spans = navToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }
    
    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const nav = document.querySelector('.nav');
                const navHeight = nav ? nav.offsetHeight : 80;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== Navbar Scroll Effect ==========
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 60) {
            nav && nav.classList.add('scrolled');
        } else {
            nav && nav.classList.remove('scrolled');
        }
    });
    
    // ========== Scroll Animations ==========
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 120);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    
    // ========== Update Copyright Year ==========
    const footerYear = document.querySelector('.footer-year');
    if (footerYear) {
        footerYear.textContent = `© ${new Date().getFullYear()}`;
    }
    
    // ========== Prevent placeholder link clicks ==========
    const placeholderLinks = document.querySelectorAll('a[href="#"], a[href*="["]');
    placeholderLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || (href && href.includes('['))) {
                e.preventDefault();
            }
        });
    });
});



const canvas = document.getElementById("orbitCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 420;
canvas.height = 420;

const cx = canvas.width / 2;
const cy = canvas.height / 2;

// مدارات
const orbits = [80, 130, 180];

// نقاط تدور
let particles = [];

orbits.forEach((radius, i) => {
  for (let j = 0; j < 8; j++) {
    particles.push({
      radius: radius,
      angle: Math.random() * Math.PI * 2,
      speed: 0.002 + Math.random() * 0.003
    });
  }
});

function drawCenter() {
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#00ffcc";
  ctx.fill();
}

function drawOrbits() {
  orbits.forEach(r => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,255,200,0.1)";
    ctx.stroke();
  });
}

function drawParticles() {
  particles.forEach(p => {
    let x = cx + Math.cos(p.angle) * p.radius;
    let y = cy + Math.sin(p.angle) * p.radius;

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#00ffcc";
    ctx.fill();

    p.angle += p.speed;
    p.x = x;
    p.y = y;
  });
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 70) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = "rgba(0,255,200,0.08)";
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawOrbits();
  drawParticles();
  connectParticles();
  drawCenter();

  requestAnimationFrame(animate);
}

animate();
if (window.innerWidth >= 768) {
    animate();
  }