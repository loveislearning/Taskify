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