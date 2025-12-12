/**
 * Main Application JavaScript
 * Cleaned and Optimized Version
 */

// App Configuration
const CONFIG = {
    SCROLL_THRESHOLD: 300,
    LOADING_DELAY: 1000,
    ANIMATION_DELAY: 500,
    HEADER_SCROLL_THRESHOLD: 100
};

// DOM Elements Cache
const DOM = {
    mobileMenuToggle: null,
    navList: null,
    contactForm: null,
    header: null,
    themeToggle: null,
    backToTop: null,
    scrollProgress: null
};

// App State
const STATE = {
    isMobileMenuOpen: false,
    currentTheme: null
};

/**
 * Initialize the application
 */
function initApp() {
    cacheDOMElements();
    setupThemeToggle();
    setupMobileMenu();
    setupSmoothScrolling();
    setupContactForm();
    setupScrollEffects();
    setupAnimations();
    setupLoadingScreen();
    setupBackToTop();
    setupScrollProgress();
}

/**
 * Cache frequently used DOM elements
 */
function cacheDOMElements() {
    DOM.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    DOM.navList = document.querySelector('.nav-list');
    DOM.contactForm = document.querySelector('.contact-form');
    DOM.header = document.querySelector('.header');
}

/**
 * Setup theme toggle functionality
 */
function setupThemeToggle() {
    // Create theme toggle button
    DOM.themeToggle = document.createElement('button');
    DOM.themeToggle.className = 'theme-toggle';
    DOM.themeToggle.setAttribute('aria-label', 'Toggle dark/light theme');
    document.body.appendChild(DOM.themeToggle);

    // Set initial theme
    STATE.currentTheme = localStorage.getItem('theme') || 'light-theme';
    document.documentElement.classList.add(STATE.currentTheme);

    // Update button icon
    updateThemeToggleIcon();

    // Add click event
    DOM.themeToggle.addEventListener('click', toggleTheme);
}

/**
 * Update theme toggle button icon based on current theme
 */
function updateThemeToggleIcon() {
    const isDark = document.documentElement.classList.contains('dark-theme');
    DOM.themeToggle.innerHTML = isDark ? getMoonIcon() : getSunIcon();
}

/**
 * Get sun icon SVG for light theme
 */
function getSunIcon() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S14.2,8,12,8z"/>
        </svg>
    `;
}

/**
 * Get moon icon SVG for dark theme
 */
function getMoonIcon() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12,9c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S10.3,9,12,9z M12,7c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S14.8,7,12,7z"/>
            <path fill="currentColor" d="M12,6l-1.4,3.4L7,10l2.6,1.4L12,14l1.4-2.6L17,10l-3.6-0.6L12,6z"/>
        </svg>
    `;
}

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark-theme');
    
    if (isDark) {
        html.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light-theme');
    } else {
        html.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    }
    
    updateThemeToggleIcon();
}

/**
 * Setup mobile menu functionality
 */
function setupMobileMenu() {
    if (!DOM.mobileMenuToggle || !DOM.navList) return;

    DOM.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            if (STATE.isMobileMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
}

/**
 * Toggle mobile menu open/close
 */
function toggleMobileMenu() {
    STATE.isMobileMenuOpen = !STATE.isMobileMenuOpen;
    
    DOM.mobileMenuToggle.classList.toggle('active');
    DOM.navList.classList.toggle('active');
    
    // Prevent body scrolling when menu is open
    document.body.style.overflow = STATE.isMobileMenuOpen ? 'hidden' : '';
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                closeMobileMenu();
                scrollToElement(targetElement);
            }
        });
    });
}

/**
 * Close mobile menu if open
 */
function closeMobileMenu() {
    if (STATE.isMobileMenuOpen) {
        toggleMobileMenu();
    }
}

/**
 * Smooth scroll to element
 */
function scrollToElement(element) {
    const headerHeight = DOM.header ? DOM.header.offsetHeight : 80;
    const targetPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Setup contact form handling
 */
function setupContactForm() {
    if (!DOM.contactForm) return;

    DOM.contactForm.addEventListener('submit', handleFormSubmit);
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(DOM.contactForm);
    const formValues = Object.fromEntries(formData.entries());
    
    if (validateForm(formValues)) {
        // In production, send data to server here
        showFormSuccess();
        DOM.contactForm.reset();
    }
}

/**
 * Validate form fields
 */
function validateForm(formData) {
    const { name, email, message } = formData;
    
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
        alert('Please fill in all required fields.');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

/**
 * Simple email validation
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Show form submission success message
 */
function showFormSuccess() {
    alert('Thank you for your message! We\'ll get back to you soon.');
}

/**
 * Setup scroll-based effects
 */
function setupScrollEffects() {
    if (!DOM.header) return;
    
    window.addEventListener('scroll', throttle(handleScroll, 100));
}

/**
 * Handle scroll events
 */
function handleScroll() {
    updateHeaderOnScroll();
    updateBackToTopButton();
    updateScrollProgress();
}

/**
 * Update header styles on scroll
 */
function updateHeaderOnScroll() {
    if (!DOM.header) return;
    
    const scrolled = window.scrollY > CONFIG.HEADER_SCROLL_THRESHOLD;
    const isDarkTheme = document.documentElement.classList.contains('dark-theme');
    
    if (scrolled) {
        DOM.header.style.boxShadow = 'var(--shadow-sm)';
        DOM.header.style.backgroundColor = isDarkTheme 
            ? 'rgba(44, 62, 80, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
    } else {
        DOM.header.style.boxShadow = 'none';
        DOM.header.style.backgroundColor = '';
    }
}

/**
 * Setup animation observers
 */
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(animateOnScroll, observerOptions);
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/**
 * Animate elements when they come into view
 */
function animateOnScroll(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}

/**
 * Setup loading screen
 */
function setupLoadingScreen() {
    // Only show loading screen if page hasn't loaded yet
    if (document.readyState !== 'complete') {
        showLoadingScreen();
    }
    
    window.addEventListener('load', () => {
        setTimeout(hideLoadingScreen, CONFIG.LOADING_DELAY);
    });
}

/**
 * Show loading screen
 */
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = '<div class="loader" aria-label="Loading..."></div>';
    document.body.appendChild(loadingScreen);
}

/**
 * Hide loading screen
 */
function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.remove(), CONFIG.ANIMATION_DELAY);
    }
}

/**
 * Setup back to top button
 */
function setupBackToTop() {
    DOM.backToTop = document.createElement('button');
    DOM.backToTop.className = 'back-to-top';
    DOM.backToTop.innerHTML = '↑';
    DOM.backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(DOM.backToTop);

    DOM.backToTop.addEventListener('click', scrollToTop);
}

/**
 * Update back to top button visibility
 */
function updateBackToTopButton() {
    if (!DOM.backToTop) return;
    
    const isVisible = window.pageYOffset > CONFIG.SCROLL_THRESHOLD;
    DOM.backToTop.classList.toggle('visible', isVisible);
}

/**
 * Scroll to top of page
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Setup scroll progress bar
 */
function setupScrollProgress() {
    DOM.scrollProgress = document.createElement('div');
    DOM.scrollProgress.className = 'scroll-progress';
    DOM.scrollProgress.setAttribute('role', 'progressbar');
    DOM.scrollProgress.setAttribute('aria-valuemin', '0');
    DOM.scrollProgress.setAttribute('aria-valuemax', '100');
    document.body.appendChild(DOM.scrollProgress);
}

/**
 * Update scroll progress bar
 */
function updateScrollProgress() {
    if (!DOM.scrollProgress) return;
    
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    
    DOM.scrollProgress.style.width = `${scrolled}%`;
    DOM.scrollProgress.setAttribute('aria-valuenow', Math.round(scrolled));
}

/**
 * Throttle function for performance
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Initialize app when DOM is loaded
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
