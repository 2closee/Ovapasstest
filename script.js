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
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ===== Form Validation & API Submission =====
    const pickupInput = document.getElementById('pickup');
    const destinationInput = document.getElementById('destination');
    const findCourierBtn = document.querySelector('.btn-find-courier');
    
    function validateForm() {
        let isValid = true;
        if (!pickupInput.value.trim()) {
            showError(pickupInput, 'Please enter a pickup location');
            isValid = false;
        }
        if (!destinationInput.value.trim()) {
            showError(destinationInput, 'Please enter a destination');
            isValid = false;
        }
        return isValid;
    }
    
    findCourierBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        if (!validateForm()) return;
        
        // Show loading state
        findCourierBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        findCourierBtn.disabled = true;
        
        try {
            const response = await fetch('http://localhost:3000/api/request-delivery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pickup: pickupInput.value,
                    destination: destinationInput.value
                })
            });
            
            const data = await response.json();
            showNotification('success', `Courier requested! ${data.message}`);
            
        } catch (error) {
            console.error('Error:', error);
            showNotification('error', 'Failed to request courier. Please try again.');
        } finally {
            findCourierBtn.innerHTML = 'Find a courier';
            findCourierBtn.disabled = false;
        }
    });
    
    function showError(input, message) {
        const inputGroup = input.closest('.input-group');
        inputGroup.classList.add('error');
        let errorElement = inputGroup.querySelector('.error-message') || document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        inputGroup.appendChild(errorElement);
        
        setTimeout(() => {
            inputGroup.classList.remove('error');
            errorElement.remove();
        }, 3000);
    }
    
    function showNotification(type, message) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mobileMenuBtn.click();
                }
            }
        });
    });

    // ===== Pricing Card Selection =====
    document.querySelectorAll('.btn-select').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.pricing-card');
            document.querySelectorAll('.pricing-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });

    // ===== Scroll Animations =====
    function animateOnScroll() {
        document.querySelectorAll('.service-card, .step, .pricing-card').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('animate');
            }
        });
    }
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // ===== Service Card Hover Effects =====
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.service-icon').style.transform = 'scale(1.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.service-icon').style.transform = 'scale(1)';
        });
    });


    const auth = firebase.auth();
const database = firebase.database();

document.querySelector('.btn-signup').addEventListener('click', () => {
  const email = prompt("Enter email:");
  const password = prompt("Enter password:");
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Save user data to Realtime DB
      database.ref('users/' + userCredential.user.uid).set({
        email: email,
        signupDate: new Date().toISOString()
      });
      alert("Signup successful!");
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

document.querySelector('.btn-login').addEventListener('click', () => {
  const email = prompt("Enter email:");
  const password = prompt("Enter password:");
  
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Logged in!");
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

    // ===== Inject CSS =====
    const style = document.createElement('style');
    style.textContent = `
        /* Mobile Menu */
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
        
        /* Form Styles */
        .input-group.error .input-field {
            border-color: #ff4444;
        }
        .error-message {
            color: #ff4444;
            font-size: 14px;
            margin-top: 5px;
        }
        
        /* Pricing Cards */
        .pricing-card.selected {
            border: 2px solid #000 !important;
            transform: scale(1.02);
        }
        
        /* Animations */
        .service-card, .step, .pricing-card {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
        }
        .service-card.animate, .step.animate, .pricing-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Notifications */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            animation: slide-in 0.3s ease-out;
        }
        .notification.success {
            background: #4CAF50;
            color: white;
        }
        .notification.error {
            background: #f44336;
            color: white;
        }
        .notification.fade-out {
            animation: fade-out 0.5s ease forwards;
        }
        @keyframes slide-in {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        @keyframes fade-out {
            to { opacity: 0; transform: translateY(-20px); }
        }
        
        /* Loading Spinner */
        .fa-spinner {
            margin-right: 8px;
        }
    `;
    document.head.appendChild(style);
});
