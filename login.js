function togglePasswordVisibility() {
    let passwordInput = document.getElementById("loginPassword");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

function validateEmail() {
    const email = document.getElementById("signupEmail");
    const emailError = document.getElementById("emailError");
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailPattern.test(email.value)) {
        email.classList.add("error");
        emailError.textContent = "Invalid email format";
        return false;
    } else {
        email.classList.remove("error");
        emailError.textContent = "";
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById("signupPassword");
    const passwordError = document.getElementById("passwordError");
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordPattern.test(password.value)) {
        password.classList.add("error");
        passwordError.textContent = "Password must be at least 8 characters, include upper & lowercase letters, a number, and a special character.";
        return false;
    } else {
        password.classList.remove("error");
        passwordError.textContent = "";
        return true;
    }
}

function checkValidation(event) {
    event.preventDefault();  
    if (validateEmail() && validatePassword()) {
        alert("Sign Up Successful!");
        window.location.href = "mainpage.html";  
    }
}

function handleSignIn(event) {
    event.preventDefault();  
    const username = document.querySelector('input[name="username"]').value;
    const password = document.getElementById("loginPassword").value;

    if (username && password) {
        alert("Sign In Successful!");
        window.location.href = "mainpage.html";  
    } else {
        alert("Please fill in all fields!");
    }
}

function toggleForm() {
    document.querySelector(".login-form").style.display = "none";
    document.querySelector(".sign-up-form").style.display = "block";
    document.querySelector(".forgot-password-form").style.display = "none";
}

function toggleForgotPassword() {
    document.querySelector(".login-form").style.display = "none";
    document.querySelector(".sign-up-form").style.display = "none";
    document.querySelector(".forgot-password-form").style.display = "block";
}

function toggleLogin() {
    document.querySelector(".login-form").style.display = "block";
    document.querySelector(".sign-up-form").style.display = "none";
    document.querySelector(".forgot-password-form").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".login-form h2").textContent = "Sign In";

    const signupForm = document.querySelector(".sign-up-form");
    signupForm.addEventListener("submit", checkValidation);

    const signinForm = document.querySelector(".login-form");
    signinForm.addEventListener("submit", handleSignIn);
});