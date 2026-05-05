// About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Scroll Animations ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Animate sections
    const sections = document.querySelectorAll('.about-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Animate skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        category.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(category);
    });
    
    // Animate certificates
    const certificates = document.querySelectorAll('.certificate-card');
    certificates.forEach(cert => {
        cert.style.opacity = '0';
        cert.style.transform = 'translateY(20px)';
        cert.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(cert);
    });
    
    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== Placeholder Link Warning ==========
    const placeholderLinks = document.querySelectorAll('a[href*="["], a[href="#"]');
    placeholderLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.includes('[') || href === '#') {
                e.preventDefault();
                console.log('Please update this link with your actual information');
            }
        });
    });
    
    // ========== Add Card Click Handler ==========
    const addCards = document.querySelectorAll('.add-card');
    addCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Add your content here by editing the HTML');
        });
    });
});
