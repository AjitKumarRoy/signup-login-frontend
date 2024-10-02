
// Login form event listener
document.getElementById('login').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const email = document.querySelector('#login input[type="text"]').value;
    const password = document.querySelector('#login input[type="password"]').value;

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Login successful');
    } else {
        alert(data.message);
    }


     // Clear the input fields
     document.querySelector('#login input[type="text"]').value = '';
     document.querySelector('#login input[type="password"]').value = '';
});



// Signup form event listener
document.getElementById('signup').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.querySelector('#signup input[type="text"]').value;
    const email = document.querySelector('#signup input[type="email"]').value;
    const password = document.querySelector('#signup input[type="password"]').value;

    const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Signup successful');
        // Redirect to the login page after signup
        window.location.href = './index.html'; // Adjust to your actual login page URL
    } else {
        alert(data.message);
    }


       // Clear the input fields
       document.querySelector('#signup input[type="text"]').value = '';
       document.querySelector('#signup input[type="email"]').value = '';
       document.querySelector('#signup input[type="password"]').value = '';
});





//---------------------------------------------------------------------------






var loginForm = document.getElementById("login");
var signupForm = document.getElementById("signup");
var btn = document.getElementById("btn");

function signup() {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    btn.style.left = "50%";
}

function login() {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    btn.style.left = "0";
}











//---------------------------------------------------------------------------




// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(item => {
    item.addEventListener('click', function () {
        const passwordField = this.previousElementSibling;
        const fieldType = passwordField.getAttribute('type');
        passwordField.setAttribute('type', fieldType === 'password' ? 'text' : 'password');
        this.textContent = fieldType === 'password' ? '👁️‍🗨️' : '👁️'; // Toggle eye icon
    });
});

// Forgot Password Modal
const forgotPasswordModal = document.getElementById('forgot-password-modal');

function openForgotPassword() {
    forgotPasswordModal.style.display = 'block';
}

function closeForgotPassword() {
    forgotPasswordModal.style.display = 'none';
}

function submitForgotPassword() {
    const email = document.getElementById('forgot-email').value;
    if (email) {
        alert('Password reset link sent to ' + email);
        closeForgotPassword();
    } else {
        alert('Please enter your email');
    }
}

// Signup and Login Form Toggle Logic
var loginForm = document.getElementById("login");
var signupForm = document.getElementById("signup");
var btn = document.getElementById("btn");

function signup() {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    btn.style.left = "50%";
}

function login() {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    btn.style.left = "0";
}



//---------------------------------------------------------------------------


// frontend redirection to dashboard

document.getElementById('login').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const email = document.querySelector('#login input[type="text"]').value;
    const password = document.querySelector('#login input[type="password"]').value;

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        //alert('Login successful');
        // Redirect to a protected dashboard or profile page
        window.location.href = './dashboard.html'; // Or your desired protected page
    } else {
        //alert(data.message);
    }
});




//---------------------------------------------------------------------------


// // forgot password

// // In your routes file
// app.post('/auth/forgot-password', async (req, res) => {
//     const { email } = req.body;
  
//     // Call the function to send the email
//     try {
//       await sendPasswordResetEmail(email);
//       res.status(200).json({ message: 'Password reset link sent to your email.' });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });


document.getElementById('forgot-password-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        // Display a message to the user
        if (response.ok) {
            document.getElementById('message').textContent = data.message;
        } else {
            document.getElementById('message').textContent = data.message || 'Error sending reset link';
        }
    } catch (error) {
        document.getElementById('message').textContent = 'An error occurred while sending the request';
        console.error('Error:', error);
    }
});





//--------------------------------------------------------------------------------------------------



// Get the modal
const modal = document.getElementById('forgot-password-modal');

// Get the link that opens the modal
const link = document.getElementById('forgot-password-link');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks the link, open the modal
link.onclick = function(event) {
  event.preventDefault();
  modal.style.display = 'flex'; // show the modal
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Form submission handling
document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const messageDiv = document.getElementById('message');
  
  // Simulate sending email
  messageDiv.textContent = 'Reset link sent to ' + email;
  
  // Close the modal after 2 seconds
  setTimeout(() => {
    modal.style.display = 'none';
    messageDiv.textContent = ''; // Reset message
  }, 2000);
});


  


