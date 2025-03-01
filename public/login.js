const API_URL = "http://localhost:4010"; // Update with your backend URL

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.querySelector(".toggle-password");

    // Password visibility toggle
    if (togglePassword) {
        togglePassword.addEventListener("click", function () {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            togglePassword.innerHTML = type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    // Load remembered email if exists
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
        document.getElementById("email").value = rememberedEmail;
        document.getElementById("remember").checked = true;
    }

    // Form validation & submission
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = passwordInput.value;
            const rememberMe = document.getElementById("remember").checked;

            // Basic validation
            let isValid = validateForm(email, password);
            if (!isValid) return;

            // Send login request to backend
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            showMessage(result.message, response.ok);

            if (response.ok) {
                // Store token in session/local storage
                localStorage.setItem("authToken", result.token);

                // Remember email if checkbox is checked
                if (rememberMe) {
                    localStorage.setItem("rememberedEmail", email);
                } else {
                    localStorage.removeItem("rememberedEmail");
                }

                // Redirect to dashboard after successful login
                setTimeout(() => {
                    window.location.href = "user-data.html"; // Change this to your dashboard page
                }, 2000);
            }
        });
    }

    // Social login animation
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
function validateForm(email, password) {
    let isValid = true;
    document.querySelectorAll(".validation-message").forEach((msg) => (msg.textContent = ""));

    if (!email.includes("@")) {
        document.querySelector("#email + .validation-message").textContent = "Please enter a valid email";
        isValid = false;
    }

    if (password.length < 6) {
        document.querySelector(".password-input-group + .validation-message").textContent = "Password must be at least 6 characters";
        isValid = false;
    }

    return isValid;
}

// Display success or error message
function showMessage(message, success) {
    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "block";
    successMessage.textContent = message;
    successMessage.style.color = success ? "green" : "red";
}
