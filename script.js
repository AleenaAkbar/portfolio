// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');
const form = document.getElementById('contact-form');
const currentYear = document.getElementById('current-year');

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a nav link
navItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Highlight active section in navigation
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skills on scroll
const skillBars = document.querySelectorAll('.skill-level');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.parentElement.getAttribute('data-percent');
        bar.style.width = '0%';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = `${width}%`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
};

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Animate skills when skills section is in view
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }
    
    // Add fade-in animation to sections
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
});

// Form submission
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again later.');
        }
    });
}

// Add animation to project cards on scroll
const projectCards = document.querySelectorAll('.project-card');

const animateOnScroll = () => {
    projectCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Initial check for elements in viewport
window.addEventListener('load', () => {
    animateOnScroll();
    
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.hero-content, .about-content, .section-title, .project-card');
    animateElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.2}s`;
    });
});

// Check for elements in viewport on scroll
window.addEventListener('scroll', animateOnScroll);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});
