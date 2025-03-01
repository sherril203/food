const API_URL = "http://localhost:4010"; // Update with your backend URL

    // Password strength checker
    function checkPasswordStrength(password, strengthBar = null, strengthText = null) {
        let strength = 0;
        const patterns = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            numbers: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };

        strength += Object.values(patterns).filter(Boolean).length;

        if(strengthBar && strengthText) {
            const strengthColors = ["#ff4757", "#ffa502", "#2ed573", "#7bed9f"];
            const strengthMessages = ["Weak", "Fair", "Good", "Strong"];
    
            strengthBar.style.width = `${(strength / 5) * 100}%`;
            strengthBar.style.background = strengthColors[strength - 1] || "#ddd";
            strengthText.textContent = strengthMessages[strength - 1] || "";
        }


        return strength;
    }

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.querySelector(".toggle-password");
    const strengthBar = document.querySelector(".strength-bar");
    const strengthText = document.querySelector(".strength-text");

    // Password visibility toggle
    if (togglePassword) {
        togglePassword.addEventListener("click", function () {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            togglePassword.innerHTML = type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener("input", function () {
            checkPasswordStrength(this.value, strengthBar, strengthText);
        });
    }

    // Form validation & submission
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = passwordInput.value;

            // Basic validation
            let isValid = validateForm(username, email, password);
            if (!isValid) return;

            // Send signup request to backend
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: username, email, password }),
            });

            const result = await response.json();
            showSuccessMessage(result.message, response.ok);

            if (response.ok) {
                setTimeout(() => {
                    window.location.href = "login.html"; // Redirect to login page after signup
                }, 2000);
            }
        });
    }

    // Social sign-up animation
    const googleBtn = document.querySelector(".google-btn");
    if (googleBtn) {
        googleBtn.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.02)";
        });
        googleBtn.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });
    }
});

// Form validation function
function validateForm(username, email, password) {
    let isValid = true;
    document.querySelectorAll(".validation-message").forEach((msg) => (msg.textContent = ""));

    if (username.trim().length < 3) {
        document.querySelector("#username + .validation-message").textContent = "Username must be at least 3 characters";
        isValid = false;
    }

    if (!email.includes("@")) {
        document.querySelector("#email + .validation-message").textContent = "Please enter a valid email";
        isValid = false;
    }

    if (checkPasswordStrength(password) < 3) {
        document.querySelector(".strength-text").textContent = "Password not strong enough";
        isValid = false;
    }

    return isValid;
}

// Display success or error message
function showSuccessMessage(message, success) {
    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "block";
    successMessage.textContent = message;
    successMessage.style.color = success ? "green" : "red";
}
