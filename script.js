// script.js

document.addEventListener('DOMContentLoaded', function() {
    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const authButtons = document.querySelector('.auth-buttons');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        authButtons.classList.toggle('active');
        this.classList.toggle('active');
    });

    // ===== Form Tab Switching =====
    const tabButtons = document.querySelectorAll('.tab-btn');
    const formContent = document.querySelector('.form-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you would typically switch form content
            // For now we'll just show the same form for both tabs
        });
    });

    // ===== Form Validation =====
    const deliveryForm = document.querySelector('.delivery-form');
    const pickupInput = document.getElementById('pickup');
    const destinationInput = document.getElementById('destination');
    const findCourierBtn = document.querySelector('.btn-find-courier');
    
    findCourierBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Simple validation
        if (!pickupInput.value.trim()) {
            showError(pickupInput, 'Please enter a pickup location');
            return;
        }
        
        if (!destinationInput.value.trim()) {
            showError(destinationInput, 'Please enter a destination');
            return;
        }
        
        // If validation passes
        alert(`Courier requested from ${pickupInput.value} to ${destinationInput.value}`);
        // In a real app, you would submit the form data to your backend here
    });
    
    function showError(input, message) {
        const inputGroup = input.closest('.input-group');
        let errorElement = inputGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            inputGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        inputGroup.classList.add('error');
        
        // Remove error after 3 seconds
        setTimeout(() => {
            inputGroup.classList.remove('error');
            errorElement.textContent = '';
        }, 3000);
    }

    // ===== Smooth Scrolling for Navigation =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    authButtons.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // ===== Pricing Card Selection =====
    const pricingCards = document.querySelectorAll('.pricing-card');
    const selectButtons = document.querySelectorAll('.btn-select');
    
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.pricing-card');
            const tier = card.querySelector('.pricing-tier').textContent;
            
            // Visual feedback
            pricingCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            // In a real app, you would store the selected tier and proceed to checkout
            alert(`You selected the ${tier} plan`);
        });
    });

    // ===== App Download Buttons =====
    const appStoreBtn = document.querySelector('.btn-app-store');
    const googlePlayBtn = document.querySelector('.btn-google-play');
    
    appStoreBtn.addEventListener('click', function() {
        alert('Redirecting to App Store');
        // window.location.href = 'your-app-store-link';
    });
    
    googlePlayBtn.addEventListener('click', function() {
        alert('Redirecting to Google Play');
        // window.location.href = 'your-google-play-link';
    });

    // ===== Login/Signup Buttons =====
    const loginBtn = document.querySelector('.btn-login');
    const signupBtn = document.querySelector('.btn-signup');
    
    loginBtn.addEventListener('click', function() {
        alert('Login form would appear here');
        // Show login modal or redirect to login page
    });
    
    signupBtn.addEventListener('click', function() {
        alert('Signup form would appear here');
        // Show signup modal or redirect to signup page
    });

    // ===== Scroll Animation =====
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .step, .pricing-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // ===== Service Card Hover Effects =====
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1)';
        });
    });
});

// ===== Additional CSS for JavaScript interactions =====
// Add this to your CSS file or create a style element in JavaScript
const additionalStyles = `
    /* Mobile menu active state */
    .main-nav.active {
        display: block !important;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: #fff;
        padding: 20px;
        box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    }
    
    .main-nav.active .nav-list {
        flex-direction: column;
        gap: 15px;
    }
    
    .auth-buttons.active {
        display: flex !important;
        position: absolute;
        top: calc(100% + 120px);
        left: 20px;
        width: calc(100% - 40px);
    }
    
    .mobile-menu-btn.active i {
        color: #000;
    }
    
    /* Form error states */
    .input-group.error .input-field {
        border-color: #ff4444;
    }
    
    .error-message {
        color: #ff4444;
        font-size: 14px;
        margin-top: 5px;
    }
    
    /* Pricing card selection */
    .pricing-card.selected {
        border: 2px solid #000;
        transform: scale(1.02);
    }
    
    /* Animation classes */
    .service-card, .step, .pricing-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .service-card.animate, .step.animate, .pricing-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Delay animations for staggered effect */
    .step:nth-child(1) { transition-delay: 0.1s; }
    .step:nth-child(2) { transition-delay: 0.2s; }
    .step:nth-child(3) { transition-delay: 0.3s; }
    .step:nth-child(4) { transition-delay: 0.4s; }
    
    .service-card:nth-child(1) { transition-delay: 0.1s; }
    .service-card:nth-child(2) { transition-delay: 0.2s; }
    .service-card:nth-child(3) { transition-delay: 0.3s; }
    .service-card:nth-child(4) { transition-delay: 0.4s; }
    
    .pricing-card:nth-child(1) { transition-delay: 0.1s; }
    .pricing-card:nth-child(2) { transition-delay: 0.2s; }
    .pricing-card:nth-child(3) { transition-delay: 0.3s; }
`;

// Inject additional styles
const styleElement = document.createElement('style');
styleElement.innerHTML = additionalStyles;
document.head.appendChild(styleElement);
