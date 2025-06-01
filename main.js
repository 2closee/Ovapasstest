// main.js

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7wfhhhihXZInLbEGQ89XOoCk-qbLPKP8",
    authDomain: "ovapass-logistis.firebaseapp.com",
    databaseURL: "https://ovapass-logistis-default-rtdb.firebaseio.com",
    projectId: "ovapass-logistis",
    storageBucket: "ovapass-logistis.firebasestorage.app",
    messagingSenderId: "440766628053",
    appId: "1:440766628053:web:7265ca38aa177c0329625c",
    measurementId: "G-CSSBNP83VE"
};
firebase.initializeApp(firebaseConfig);

// Auth Functions
function setupAuthModals() {
    // Modal open buttons
    document.querySelectorAll('.btn-login').forEach(btn => {
        btn.onclick = () => {
            const modal = document.getElementById('login-modal');
            if (modal) modal.style.display = 'block';
        };
    });
    document.querySelectorAll('.btn-signup').forEach(btn => {
        btn.onclick = () => {
            const modal = document.getElementById('signup-modal');
            if (modal) modal.style.display = 'block';
        };
    });

    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.auth-modal').forEach(modal => {
                modal.style.display = 'none';
            });
        };
    });

    // Click outside modal closes it
    window.onclick = (e) => {
        if (e.target.classList && e.target.classList.contains('auth-modal')) {
            e.target.style.display = 'none';
        }
    };

    // Login form submit
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.onsubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const btn = loginForm.querySelector('button');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
                const modal = document.getElementById('login-modal');
                if (modal) modal.style.display = 'none';
                showNotification('success', 'Logged in successfully!');
            } catch (error) {
                showNotification('error', error.message);
            } finally {
                btn.disabled = false;
                btn.innerHTML = 'Log In';
            }
        };
    }

    // Signup form submit
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.onsubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const btn = signupForm.querySelector('button');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
            try {
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
                await firebase.database().ref('users/' + userCredential.user.uid).set({
                    email: email,
                    createdAt: firebase.database.ServerValue.TIMESTAMP
                });
                const modal = document.getElementById('signup-modal');
                if (modal) modal.style.display = 'none';
                showNotification('success', 'Account created successfully!');
            } catch (error) {
                showNotification('error', error.message);
            } finally {
                btn.disabled = false;
                btn.innerHTML = 'Create Account';
            }
        };
    }
}

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function() {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileNav = document.getElementById("mobileNav");

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener("click", function() {
            mobileNav.style.display = (mobileNav.style.display === "block") ? "none" : "block";
        });
        mobileNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileNav.style.display = "none";
            });
        });
    }
});

// Auth State Listener - update ALL .auth-buttons and re-attach modal handlers
firebase.auth().onAuthStateChanged((user) => {
    document.querySelectorAll('.auth-buttons').forEach(authButtons => {
        if (user) {
            authButtons.innerHTML = `
                <button class="btn-logout">Logout</button>
                <span class="user-email">${user.email}</span>
            `;
        } else {
            authButtons.innerHTML = `
                <button class="btn-login">Log in</button>
                <button class="btn-signup">Sign up</button>
            `;
        }
        // Attach modal openers to new buttons
        setupAuthModals();

        // Attach logout to any new logout buttons
        const logoutBtn = authButtons.querySelector('.btn-logout');
        if (logoutBtn) {
            logoutBtn.onclick = () => {
                firebase.auth().signOut();
                showNotification('success', 'Logged out successfully');
            };
        }
    });
});

// Notification function
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

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', setupAuthModals);
