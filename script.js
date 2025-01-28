let currentSection = 0; // Start at the first section
const sections = document.querySelectorAll('main > section'); // All sections
const totalSections = sections.length; // Total number of sections

// Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetIndex = Array.from(sections).findIndex(
            section => section.id === targetId
        );

        if (targetIndex !== -1) {
            currentSection = targetIndex;
            updateSlide();
        }
    });
});

// Arrow Buttons
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

prevButton.addEventListener('click', () => {
    currentSection = (currentSection - 1 + totalSections) % totalSections;
    updateSlide();
});

nextButton.addEventListener('click', () => {
    currentSection = (currentSection + 1) % totalSections;
    updateSlide();
});

// Slide Transition
function updateSlide() {
    const offset = currentSection * -100; // Calculate horizontal offset
    document.querySelector('main').style.transform = `translateX(${offset}vw)`;
}

// Theme Toggle Functionality
const themeSwitcher = document.getElementById('themeSwitcher');
const body = document.body;

themeSwitcher.addEventListener('change', () => {
    body.classList.toggle('dark-mode', themeSwitcher.checked);
});

// Trigger Animations on Scroll
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, {
    threshold: 0.2
});

sections.forEach(section => {
    observer.observe(section);
});

