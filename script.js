document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            const isExpanded = navList.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Close menu when clicking a link (mobile)
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });

    // Smooth Scroll for Anchor Links (shim for older browsers, keeping it simple)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple lazy loading placeholder logic (not strictly needed for CSS drawn placeholders but good structure)
    // Could be expanded later for real images
});
