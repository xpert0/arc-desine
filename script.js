// ===== MAIN APPLICATION ===== 
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initScrollEffects();
    initAnimationOnScroll();
    initStatsAnimation();
    initSmoothScrolling();
    initFormValidation();
    initImageLazyLoading();
    initPortfolioFilter();
    initParallaxEffects();
    initHeaderScrollEffect();
    
    // Add loading state management
    document.body.classList.add('loaded');
    
    // Add fade-in animation to elements
    addFadeInAnimations();
});

// ===== ENHANCED SCROLL EFFECTS ===== 
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll direction
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
    });
}

// ===== FADE-IN ANIMATIONS ===== 
function addFadeInAnimations() {
    // Add fade-in class to main content sections
    const elementsToAnimate = document.querySelectorAll(`
        .hero-content, .service-card, .featured-item, 
        .about-content, .team-member, .stats-grid,
        .contact-method, .form-group, .section-title,
        .hero-cta, .hero-description, .ceo-info
    `);
    
    elementsToAnimate.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===== PARALLAX EFFECTS ===== 
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating, .hero-visual');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ===== ENHANCED ANIMATION ON SCROLL ===== 
function initAnimationOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.fade-in:not(.visible)');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Observe sections for enhanced effects
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ===== PORTFOLIO FILTER ===== 
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterButtons.length || !portfolioItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== MOBILE NAVIGATION ===== 
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== SCROLL EFFECTS ===== 
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        
        // Add/remove scrolled class for styling
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header based on scroll direction
        if (scrollY > lastScrollY && scrollY > 300) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
    }
    
    // Throttle scroll events for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS ===== 
function initAnimationOnScroll() {
    // Create intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animations for children
                const children = entry.target.querySelectorAll('.service-card, .featured-item, .stat-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.services, .featured-work, .about-preview');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== ANIMATED STATISTICS ===== 
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const animateStats = function() {
        if (animated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCount = function() {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCount();
        });
        
        animated = true;
    };
    
    // Trigger animation when stats section is visible
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
}

// ===== SMOOTH SCROLLING ===== 
function initSmoothScrolling() {
    // Handle all internal links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ===== FORM VALIDATION ===== 
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    showFieldError(field, 'This field is required');
                    isValid = false;
                } else {
                    clearFieldError(field);
                }
            });
            
            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                if (field.value && !isValidEmail(field.value)) {
                    showFieldError(field, 'Please enter a valid email address');
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Show success message
                showFormSuccess(form);
                form.reset();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(input);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(input);
            });
        });
    });
}

function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#dc2626';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
    field.classList.add('error');
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
}

function showFormSuccess(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
    successMessage.style.cssText = `
        background: #10b981;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
        animation: slideInUp 0.3s ease-out;
    `;
    
    form.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== LAZY LOADING ===== 
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }
}

// ===== UTILITY FUNCTIONS ===== 
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// ===== ACCESSIBILITY ENHANCEMENTS ===== 
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ===== PERFORMANCE MONITORING ===== 
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
        }, 0);
    });
}

// ===== ERROR HANDLING ===== 
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics service
});

// ===== PROGRESSIVE ENHANCEMENT ===== 
// Add class to indicate JavaScript is available
document.documentElement.classList.add('js-enabled');

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js');
    });
}
