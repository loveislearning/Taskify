function toggleForm() {
    let loginForm = document.querySelector(".login-form");
    let signUpForm = document.querySelector(".sign-up-form");
    let forgotPasswordForm = document.querySelector(".forgot-password-form");

    loginForm.style.display = (loginForm.style.display === "none") ? "block" : "none";
    signUpForm.style.display = (signUpForm.style.display === "none") ? "block" : "none";
    forgotPasswordForm.style.display = "none";
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