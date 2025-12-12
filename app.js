/**
 * Main Application JavaScript
 * Premium Enhanced Version with Advanced Animations
 */

// App Configuration
const CONFIG = {
    SCROLL_THRESHOLD: 300,
    LOADING_DELAY: 1200,
    ANIMATION_DELAY: 300,
    HEADER_SCROLL_THRESHOLD: 100,
    COUNTER_DURATION: 2000
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
    currentTheme: null,
    countersAnimated: false
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
    setupCounterAnimations();
    setupIntersectionObserver();
    setupParallaxEffects();
    initializeAOS();
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
    DOM.themeToggle.setAttribute('aria-pressed', 'false');
    document.body.appendChild(DOM.themeToggle);

    // Set initial theme
    STATE.currentTheme = localStorage.getItem('theme') || 'light-theme';
    document.documentElement.classList.add(STATE.currentTheme);

    // Update button icon and state
    updateThemeToggleIcon();

    // Add click event
    DOM.themeToggle.addEventListener('click', toggleTheme);
    
    // Add keyboard support
    DOM.themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

/**
 * Update theme toggle button icon based on current theme
 */
function updateThemeToggleIcon() {
    const isDark = document.documentElement.classList.contains('dark-theme');
    DOM.themeToggle.innerHTML = isDark ? getMoonIcon() : getSunIcon();
    DOM.themeToggle.setAttribute('aria-pressed', isDark);
}

/**
 * Get sun icon SVG for light theme
 */
function getSunIcon() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
            <g fill="currentColor">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </g>
        </svg>
    `;
}

/**
 * Get moon icon SVG for dark theme
 */
function getMoonIcon() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
            <path fill="currentColor" d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
        </svg>
    `;
}

/**
 * Toggle between dark and light themes with smooth transition
 */
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark-theme');
    
    // Add transition class for smooth theme switch
    document.body.classList.add('theme-transition');
    
    // Toggle theme with animation
    if (isDark) {
        html.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light-theme');
    } else {
        html.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    }
    
    // Update button
    updateThemeToggleIcon();
    
    // Remove transition class after animation
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 500);
}

/**
 * Setup mobile menu functionality
 */
function setupMobileMenu() {
    if (!DOM.mobileMenuToggle || !DOM.navList) return;

    DOM.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Add keyboard accessibility
    DOM.mobileMenuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu();
        }
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            if (STATE.isMobileMenuOpen) {
                toggleMobileMenu();
            }
        });
        
        // Add keyboard navigation
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && STATE.isMobileMenuOpen) {
                toggleMobileMenu();
                DOM.mobileMenuToggle.focus();
            }
        });
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && STATE.isMobileMenuOpen) {
            toggleMobileMenu();
            DOM.mobileMenuToggle.focus();
        }
    });
}

/**
 * Toggle mobile menu open/close with animation
 */
function toggleMobileMenu() {
    STATE.isMobileMenuOpen = !STATE.isMobileMenuOpen;
    
    DOM.mobileMenuToggle.classList.toggle('active');
    DOM.navList.classList.toggle('active');
    DOM.mobileMenuToggle.setAttribute('aria-expanded', STATE.isMobileMenuOpen);
    
    // Toggle body scroll
    document.body.style.overflow = STATE.isMobileMenuOpen ? 'hidden' : '';
    
    // Animate menu items
    if (STATE.isMobileMenuOpen) {
        animateMenuItems();
    }
}

/**
 * Animate mobile menu items sequentially
 */
function animateMenuItems() {
    const menuItems = DOM.navList.querySelectorAll('li');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
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
 * Smooth scroll to element with offset
 */
function scrollToElement(element) {
    const headerHeight = DOM.header ? DOM.header.offsetHeight : 80;
    const extraOffset = 20;
    const targetPosition = element.offsetTop - headerHeight - extraOffset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Setup contact form handling with validation
 */
function setupContactForm() {
    if (!DOM.contactForm) return;

    DOM.contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add input validation on blur
    DOM.contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', validateField);
    });
}

/**
 * Handle form submission with enhanced UX
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(DOM.contactForm);
    const formValues = Object.fromEntries(formData.entries());
    
    if (validateForm(formValues)) {
        // Show loading state
        const submitBtn = DOM.contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-icon" aria-hidden="true">⏳</span>';
        submitBtn.disabled = true;
        
        // Simulate API call
        await simulateApiCall();
        
        // Show success message
        showFormSuccess();
        
        // Reset form
        DOM.contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

/**
 * Simulate API call delay
 */
function simulateApiCall() {
    return new Promise(resolve => setTimeout(resolve, 1500));
}

/**
 * Validate individual form field
 */
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const errorElement = field.parentElement.querySelector('.error-message') || 
                         createErrorElement(field.parentElement);
    
    errorElement.textContent = '';
    
    if (field.required && !value) {
        errorElement.textContent = 'This field is required';
        field.classList.add('error');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        errorElement.textContent = 'Please enter a valid email address';
        field.classList.add('error');
        return false;
    }
    
    field.classList.remove('error');
    return true;
}

/**
 * Create error message element
 */
function createErrorElement(parent) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'var(--accent-color)';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    parent.appendChild(errorElement);
    return errorElement;
}

/**
 * Validate form fields
 */
function validateForm(formData) {
    let isValid = true;
    const { name, email, message } = formData;
    
    if (!name?.trim()) {
        showInlineError('name', 'Please enter your name');
        isValid = false;
    }
    
    if (!email?.trim()) {
        showInlineError('email', 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showInlineError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!message?.trim()) {
        showInlineError('message', 'Please enter your message');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Show inline error message
 */
function showInlineError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('error');
        
        let errorElement = field.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = createErrorElement(field.parentElement);
        }
        errorElement.textContent = message;
        
        // Scroll to first error
        if (isValid) {
            field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

/**
 * Simple email validation
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Show form submission success message with animation
 */
function showFormSuccess() {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
        </div>
    `;
    
    // Style the success message
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        background: var(--gradient-primary);
        color: white;
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        opacity: 0;
        transition: all 0.3s ease;
        text-align: center;
        max-width: 400px;
        width: 90%;
    `;
    
    document.body.appendChild(successMessage);
    
    // Animate in
    setTimeout(() => {
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => successMessage.remove(), 300);
    }, 3000);
}

/**
 * Setup scroll-based effects
 */
function setupScrollEffects() {
    if (!DOM.header) return;
    
    window.addEventListener('scroll', throttle(handleScroll, 100));
    window.addEventListener('resize', throttle(handleScroll, 100));
    
    // Initial call
    handleScroll();
}

/**
 * Handle scroll events
 */
function handleScroll() {
    updateHeaderOnScroll();
    updateBackToTopButton();
    updateScrollProgress();
    checkCounterVisibility();
}

/**
 * Update header styles on scroll with parallax effect
 */
function updateHeaderOnScroll() {
    if (!DOM.header) return;
    
    const scrolled = window.scrollY > CONFIG.HEADER_SCROLL_THRESHOLD;
    
    if (scrolled) {
        DOM.header.classList.add('scrolled');
        DOM.header.style.backdropFilter = 'blur(30px)';
    } else {
        DOM.header.classList.remove('scrolled');
        DOM.header.style.backdropFilter = 'blur(20px)';
    }
}

/**
 * Setup animation observers for scroll-triggered animations
 */
function setupAnimations() {
    // Animate service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Animate global list items
    const globalItems = document.querySelectorAll('.global-list-item');
    globalItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

/**
 * Setup intersection observer for scroll animations
 */
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(animateOnScroll, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.service-card, .global-list-item, .stat-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Animate elements when they come into view
 */
function animateOnScroll(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = entry.target.classList.contains('global-list-item') 
                ? 'translateX(0)' 
                : 'translateY(0) scale(1)';
        }
    });
}

/**
 * Setup loading screen with enhanced animation
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
 * Show loading screen with animation
 */
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loader" aria-label="Loading..."></div>
        <div class="loading-text" style="margin-top: 2rem; color: white; font-size: 1.2rem;">
            Loading MK Nexus...
        </div>
    `;
    document.body.appendChild(loadingScreen);
}

/**
 * Hide loading screen with fade out
 */
function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
            // Trigger initial animations after loading
            triggerInitialAnimations();
        }, CONFIG.ANIMATION_DELAY);
    }
}

/**
 * Trigger initial animations after page load
 */
function triggerInitialAnimations() {
    // Animate hero elements sequentially
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = 'fadeInUp 0.6s ease forwards';
        }, index * 200);
    });
}

/**
 * Setup back to top button
 */
function setupBackToTop() {
    DOM.backToTop = document.createElement('button');
    DOM.backToTop.className = 'back-to-top';
    DOM.backToTop.innerHTML = '↑';
    DOM.backToTop.setAttribute('aria-label', 'Back to top');
    DOM.backToTop.setAttribute('tabindex', '-1');
    document.body.appendChild(DOM.backToTop);

    DOM.backToTop.addEventListener('click', scrollToTop);
    
    // Add keyboard support
    DOM.backToTop.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
}

/**
 * Update back to top button visibility
 */
function updateBackToTopButton() {
    if (!DOM.backToTop) return;
    
    const isVisible = window.pageYOffset > CONFIG.SCROLL_THRESHOLD;
    DOM.backToTop.classList.toggle('visible', isVisible);
    
    // Update tabindex for accessibility
    DOM.backToTop.setAttribute('tabindex', isVisible ? '0' : '-1');
}

/**
 * Scroll to top of page with smooth animation
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Focus management for accessibility
    setTimeout(() => {
        document.querySelector('header').focus();
    }, 500);
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
    DOM.scrollProgress.setAttribute('aria-valuenow', '0');
    DOM.scrollProgress.setAttribute('aria-label', 'Scroll progress');
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
 * Setup counter animations for statistics
 */
function setupCounterAnimations() {
    // Store all counter elements
    STATE.counters = document.querySelectorAll('[data-count]');
    
    // Add scroll listener to trigger counters
    window.addEventListener('scroll', checkCounterVisibility);
}

/**
 * Check if counters are in view and animate them
 */
function checkCounterVisibility() {
    if (STATE.countersAnimated) return;
    
    STATE.counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView && !counter.classList.contains('animated')) {
            animateCounter(counter);
            counter.classList.add('animated');
        }
    });
    
    // Check if all counters are animated
    const allAnimated = Array.from(STATE.counters).every(c => c.classList.contains('animated'));
    if (allAnimated) {
        STATE.countersAnimated = true;
    }
}

/**
 * Animate counter from 0 to target value
 */
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = CONFIG.COUNTER_DURATION;
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
            
            // Add animation completion effect
            counter.style.transform = 'scale(1.2)';
            setTimeout(() => {
                counter.style.transform = 'scale(1)';
            }, 300);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Setup parallax effects for hero section
 */
function setupParallaxEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Apply parallax to hero background
        hero.style.backgroundPositionY = `${rate}px`;
    });
}

/**
 * Initialize AOS-like animations
 */
function initializeAOS() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .fade-in-left {
            animation: fadeInLeft 0.6s ease forwards;
        }
        
        .fade-in-right {
            animation: fadeInRight 0.6s ease forwards;
        }
        
        .theme-transition * {
            transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease !important;
        }
        
        .error {
            border-color: var(--accent-color) !important;
        }
        
        .form-success {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--gradient-primary);
            color: white;
            padding: 2rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            text-align: center;
            max-width: 400px;
            width: 90%;
        }
        
        .success-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            animation: scaleIn 0.3s ease;
        }
        
        @keyframes scaleIn {
            from { transform: scale(0); }
            to { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Throttle function for performance optimization
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
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
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
