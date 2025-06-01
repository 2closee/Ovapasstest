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
    // Modal toggle logic
    document.querySelector('.btn-login').addEventListener('click', () => {
        document.getElementById('login-modal').style.display = 'block';
    });

    document.querySelector('.btn-signup').addEventListener('click', () => {
        document.getElementById('signup-modal').style.display = 'block';
    });

    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.auth-modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });

    // Close when clicking outside modal
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('auth-modal')) {
            e.target.style.display = 'none';
        }
    });

    // Login handler
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const btn = e.target.querySelector('button');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            document.getElementById('login-modal').style.display = 'none';
            showNotification('success', 'Logged in successfully!');
        } catch (error) {
            showNotification('error', error.message);
        } finally {
            btn.disabled = false;
            btn.innerHTML = 'Log In';
        }
    });

    // Signup handler
    document.getElementById('signup-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const btn = e.target.querySelector('button');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await firebase.database().ref('users/' + userCredential.user.uid).set({
                email: email,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            });
            document.getElementById('signup-modal').style.display = 'none';
            showNotification('success', 'Account created successfully!');
        } catch (error) {
            showNotification('error', error.message);
        } finally {
            btn.disabled = false;
            btn.innerHTML = 'Create Account';
        }
    });
}

// Auth State Listener
firebase.auth().onAuthStateChanged((user) => {
    const authButtons = document.querySelector('.auth-buttons');
    if (user) {
        authButtons.innerHTML = `
            <button class="btn-logout">Logout</button>
            <span class="user-email">${user.email}</span>
        `;
        document.querySelector('.btn-logout').addEventListener('click', () => {
            firebase.auth().signOut();
            showNotification('success', 'Logged out successfully');
        });
    } else {
        authButtons.innerHTML = `
            <button class="btn-login">Log in</button>
            <button class="btn-signup">Sign up</button>
        `;
        setupAuthModals();
    }
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
document.addEventListener('DOMContentLoaded', () => {
    setupAuthModals();
    // Your other initializations...
});
