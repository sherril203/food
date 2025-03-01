document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Password visibility toggle
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    // Password strength checker
    function checkPasswordStrength(password) {
        let strength = 0;
        const patterns = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            numbers: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        
        strength += Object.values(patterns).filter(Boolean).length;
        
        const strengthColors = ['#ff4757', '#ffa502', '#2ed573', '#7bed9f'];
        const strengthMessages = ['Weak', 'Fair', 'Good', 'Strong'];
        
        strengthBar.style.width = `${(strength / 5) * 100}%`;
        strengthBar.style.background = strengthColors[strength - 1] || '#ddd';
        strengthText.textContent = strengthMessages[strength - 1] || '';
        
        return strength;
    }
    
    passwordInput.addEventListener('input', function() {
        checkPasswordStrength(this.value);
    });
    
    // Form validation and submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = passwordInput.value;
        
        // Basic validation
        let isValid = true;
        const validationMessages = document.querySelectorAll('.validation-message');
        validationMessages.forEach(msg => msg.textContent = '');
        
        if (username.length < 3) {
            document.querySelector('#username + .validation-message').textContent = 'Username must be at least 3 characters';
            isValid = false;
        }
        
        if (!email.includes('@')) {
            document.querySelector('#email + .validation-message').textContent = 'Please enter a valid email';
            isValid = false;
        }
        
        if (checkPasswordStrength(password) < 3) {
            document.querySelector('.strength-text').textContent = 'Password not strong enough';
            isValid = false;
        }
        
        if (isValid) {
            // Show success message with animation
            const successMessage = document.getElementById('success-message');
            successMessage.style.display = 'block';
            successMessage.textContent = 'Sign up successful! Redirecting...';
            
            // Simulate loading
            form.classList.add('loading');
            
            // Redirect after delay
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    });
    
    // Social sign up animation
    const googleBtn = document.querySelector('.google-btn');
    googleBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    googleBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});