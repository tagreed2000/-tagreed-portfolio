// AI Engineering Page - Project Modal System

document.addEventListener('DOMContentLoaded', function() {
    
    // Project data with details
    const projectsData = {
        1: {
            title: "",
            description: "",
            technologies: [""],
            github: "[your-github-repo-url]",
            imagePlaceholder: true
        },
       
    };

    // Modal elements
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const modalGithub = document.getElementById('modalGithub');
    const modalImage = document.getElementById('modalImage');

    // Project cards
    const projectCards = document.querySelectorAll('.project-card');

    // Open modal function
    function openModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        // Update modal content
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        
        // Update technologies
        modalTech.innerHTML = project.technologies
            .map(tech => `<span class="modal-tech-tag">${tech}</span>`)
            .join('');
        
        // Update GitHub link
        modalGithub.href = project.github;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for project cards
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openModal(projectId);
        });
    });

    // Close modal events
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Scroll animations
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
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    const learningCards = document.querySelectorAll('.learning-card');
    learningCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});
