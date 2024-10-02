//This is the better form of script.js 


//This is the scriptDemo.js file that contains the client-side JavaScript code for the login, signup, and forgot password forms. The script contains event listeners for form submissions, password visibility toggling, and form switching. The script also handles API requests to the server for login, signup, and forgot password functionality.



// Constants for API endpoints
const API_BASE_URL = 'https://signup-login-backend-production.up.railway.app/auth';
const LOGIN_URL = `${API_BASE_URL}/login`;
const SIGNUP_URL = `${API_BASE_URL}/signup`;
const FORGOT_PASSWORD_URL = `${API_BASE_URL}/forgot-password`;

// Login form event listener
document.getElementById('login').addEventListener('submit', handleLogin);

// Signup form event listener
document.getElementById('signup').addEventListener('submit', handleSignup);

// Forgot Password form event listener
document.getElementById('forgot-password-form').addEventListener('submit', handleForgotPassword);

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(item => {
    item.addEventListener('click', togglePasswordVisibility);
});

// Signup and Login Form Toggle Logic
function signup() {
    toggleForms("signup");
}

function login() {
    toggleForms("login");
}

// Function to handle login
async function handleLogin(e) {
    e.preventDefault();

    const email = document.querySelector('#login input[type="text"]').value;
    const password = document.querySelector('#login input[type="password"]').value;

    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = './dashboard.html'; // Redirect to your protected page
    } else {
        alert(data.message);
    }

    // Clear the input fields
    clearLoginForm();
}

// Function to handle signup
async function handleSignup(e) {
    e.preventDefault();

    const username = document.querySelector('#signup input[type="text"]').value;
    const email = document.querySelector('#signup input[type="email"]').value;
    const password = document.querySelector('#signup input[type="password"]').value;

    const response = await fetch(SIGNUP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Signup successful');
        window.location.href = './index.html'; // Redirect to your login page
    } else {
        alert(data.message);
    }

    // Clear the input fields
    clearSignupForm();
}

// Function to handle forgot password
async function handleForgotPassword(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;

    const response = await fetch(FORGOT_PASSWORD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });

    const data = await response.json();
    const messageDiv = document.getElementById('message');
    
    if (response.ok) {
        messageDiv.textContent = data.message;
    } else {
        messageDiv.textContent = data.message || 'Error sending reset link';
    }

    // Close the modal after 2 seconds
  setTimeout(() => {
    modal.style.display = 'none';
    messageDiv.textContent = ''; // Reset message
  }, 2000);
}

// Function to toggle password visibility
function togglePasswordVisibility() {
    const passwordField = this.previousElementSibling;
    const fieldType = passwordField.getAttribute('type');
    passwordField.setAttribute('type', fieldType === 'password' ? 'text' : 'password');
    this.textContent = fieldType === 'password' ? '👁️‍🗨️' : '👁️'; // Toggle eye icon
}

// Function to clear login form fields
function clearLoginForm() {
    document.querySelector('#login input[type="text"]').value = '';
    document.querySelector('#login input[type="password"]').value = '';
}

// Function to clear signup form fields
function clearSignupForm() {
    document.querySelector('#signup input[type="text"]').value = '';
    document.querySelector('#signup input[type="email"]').value = '';
    document.querySelector('#signup input[type="password"]').value = '';
}

// Function to toggle between login and signup forms
function toggleForms(formType) {
    const loginForm = document.getElementById("login");
    const signupForm = document.getElementById("signup");
    const btn = document.getElementById("btn");

    if (formType === "signup") {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
        btn.style.left = "50%";
    } else {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
        btn.style.left = "0";
    }
}

// Modal handling logic
const modal = document.getElementById('forgot-password-modal');
const link = document.getElementById('forgot-password-link');
const span = document.getElementsByClassName('close')[0];

link.onclick = function(event) {
    event.preventDefault();
    modal.style.display = 'flex'; // Show the modal
};

span.onclick = function() {
    modal.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
