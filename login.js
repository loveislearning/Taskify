
function togglePasswordVisibility() {
    let passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

function validateEmail() {
            const email = document.getElementById("email");
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
            const password = document.getElementById("password");
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

        function checkValidation() {
            if (validateEmail() && validatePassword()) {
                alert("Sign Up Successful!");
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
});
