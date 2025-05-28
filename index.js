// Firebase setup in script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = { /* Your config */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup function
signupBtn.addEventListener('click', () => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => alert("User created!"))
        .catch((error) => alert(error.message));
});

// Login function
loginBtn.addEventListener('click', () => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => alert("Logged in!"))
        .catch((error) => alert(error.message));
});
