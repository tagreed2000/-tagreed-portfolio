// Web Developer Page - Project Modal System

document.addEventListener('DOMContentLoaded', function() {
    
    const projectsData = {
        1: {
            title: "Portfolio Website",
            description: "A fully responsive personal portfolio website built from scratch using HTML, CSS, and JavaScript. This project demonstrates proficiency in modern web development practices including semantic HTML, CSS Grid and Flexbox layouts, smooth animations, and interactive JavaScript features. The site is optimized for performance and accessibility across all devices.",
            technologies: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design", "CSS Grid", "Flexbox"],
            github: "[your-github-repo-url]",
            image: "images/pro.png",
            imagePlaceholder: false
        } 
        ,
       2: {
            title: "Environmental Awareness Website",
            description: "A fully responsive environmental awareness website designed to combat illegal logging and promote sustainability. The platform delivers engaging and informative content through a modern UI, featuring interactive components such as animated timelines, live counters, and a dynamic map showcasing environmental efforts across Saudi Arabia.",
            technologies: ["HTML5", "CSS3", "JavaScript (basic interactivity)", "Responsive Design", "CSS Grid", "Flexbox"],
            github: "https://tagreed2000.github.io/-Make-It-Green/",
            image: "images/wqt.png",
            imagePlaceholder: false
        } 
    };

    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const modalGithub = document.getElementById('modalGithub');
    const projectCards = document.querySelectorAll('.project-card');

    function openModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;
        const modalImage = document.getElementById('modalImage');

        if (project.imagePlaceholder) {
            modalImage.innerHTML = `
                 <i class="fas fa-image"></i>
                 <p>No image available</p>
             `;
        } else {
            modalImage.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
            `;
        }



        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalTech.innerHTML = project.technologies
            .map(tech => `<span class="modal-tech-tag">${tech}</span>`)
            .join('');
        modalGithub.href = project.github;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openModal(projectId);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // Animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
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
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});
