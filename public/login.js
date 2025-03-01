document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    
    // Password visibility toggle
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    // Form validation and submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = passwordInput.value;
        const rememberMe = document.getElementById('remember').checked;
        
        // Basic validation
        let isValid = true;
        const validationMessages = document.querySelectorAll('.validation-message');
        validationMessages.forEach(msg => msg.textContent = '');
        
        if (!email.includes('@')) {
            document.querySelector('#email + .validation-message').textContent = 'Please enter a valid email';
            isValid = false;
        }
        
        if (password.length < 6) {
            document.querySelector('.password-input-group + .validation-message').textContent = 'Password must be at least 6 characters';
            isValid = false;
        }
        
        if (isValid) {
            // Show success message with animation
            const successMessage = document.getElementById('success-message');
            successMessage.style.display = 'block';
            successMessage.textContent = 'Login successful! Redirecting...';
            
            // Simulate loading
            form.classList.add('loading');
            
            // If remember me is checked, you could store the email in localStorage
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            // Redirect after delay
            setTimeout(() => {
                window.location.href = 'user-data.html'; // Change this to your dashboard page
            }, 2000);
        }
    });
    
    // Load remembered email if exists
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
    
    // Social login animation
    const googleBtn = document.querySelector('.google-btn');
    googleBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    googleBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});