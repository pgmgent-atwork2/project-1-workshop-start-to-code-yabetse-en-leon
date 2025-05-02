window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.tutorial__step');
    const navLinks = document.querySelectorAll('.sidebar__nav-link');
    
    // Huidige sectie vinden
    let current = '';
    sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 150) {
        current = section.id;
        }
    });
    
    // Update de active link
    navLinks.forEach(link => {
            link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});