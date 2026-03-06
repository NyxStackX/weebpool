// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing theme toggle...');
    
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');
    
    if (!icon) {
        console.error('Icon not found in theme toggle!');
        return;
    }

    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    console.log('Current theme:', currentTheme);
    
    if (currentTheme === 'light') {
        html.classList.add('light-mode');
        icon.className = 'bx bx-sun';
    } else {
        html.classList.remove('light-mode');
        icon.className = 'bx bx-moon';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        if (html.classList.contains('light-mode')) {
            // Switch to dark mode
            html.classList.remove('light-mode');
            icon.className = 'bx bx-moon';
            localStorage.setItem('theme', 'dark');
        } else {
            // Switch to light mode
            html.classList.add('light-mode');
            icon.className = 'bx bx-sun';
            localStorage.setItem('theme', 'light');
        }
        
        // Force a repaint
        void html.offsetWidth;
    });

    // Menu toggle functionality
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', function() {
            navbar.classList.toggle('active');
        });
    }

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
        });
    });

    // Back to top functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Page Transition Functionality
    initPageTransitions();
});

// Page Transition System
function initPageTransitions() {
    // Create transition overlay if it doesn't exist
    let transitionOverlay = document.querySelector('.page-transition');
    if (!transitionOverlay) {
        transitionOverlay = document.createElement('div');
        transitionOverlay.className = 'page-transition';
        document.body.appendChild(transitionOverlay);
    }

    // Add page-content class to main content for entrance animation
    const mainContent = document.querySelector('section') || document.querySelector('main');
    if (mainContent && !mainContent.classList.contains('page-content')) {
        mainContent.classList.add('page-content');
    }

    // Handle internal link clicks for transition
    const internalLinks = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"]):not([href^="mailto"]):not([href^="tel"])');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's the current page
            if (href === window.location.pathname.split('/').pop() || 
                (href === 'index.html' && window.location.pathname.endsWith('/'))) {
                return;
            }

            e.preventDefault();
            
            // Start transition
            document.body.classList.add('transitioning');
            transitionOverlay.classList.add('slide-up');
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = href;
            }, 600);
        });
    });

    // Handle page entrance animation
    window.addEventListener('pageshow', function(e) {
        // Remove transitioning class
        document.body.classList.remove('transitioning');
        
        // If coming from cache (back button), remove animation classes
        if (e.persisted) {
            transitionOverlay.classList.remove('slide-up', 'slide-down', 'active');
            return;
        }

        // Play entrance animation
        if (transitionOverlay.classList.contains('slide-up')) {
            transitionOverlay.classList.remove('slide-up');
            transitionOverlay.classList.add('slide-down');
            
            setTimeout(() => {
                transitionOverlay.classList.remove('slide-down', 'active');
            }, 600);
        }
    });

    // Handle initial page load
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        transitionOverlay.classList.add('slide-down');
        setTimeout(() => {
            transitionOverlay.classList.remove('slide-down', 'active');
        }, 600);
    }
}
