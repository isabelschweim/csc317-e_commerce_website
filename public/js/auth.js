// In /public/js/auth.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form[action="/login"]');
    const registerForm = document.querySelector('form[action="/register"]');
    const messageDiv = document.createElement('div');
    messageDiv.style.padding = '10px';
    messageDiv.style.margin = '10px 0';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.textAlign = 'center';

    function showMessage(message, isError = false) {
        messageDiv.textContent = message;
        messageDiv.style.backgroundColor = isError ? '#ffebee' : '#e8f5e9';
        messageDiv.style.color = isError ? '#c62828' : '#2e7d32';
        
        const container = document.querySelector('.login-container');
        if (!container.contains(messageDiv)) {
            container.insertBefore(messageDiv, container.firstChild);
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: formData.get('username'),
                        password: formData.get('password')
                    })
                });

                const data = await response.json();
                if (response.ok && data.success) {
                    window.location.href = data.redirect;
                } else {
                    showMessage(data.error || 'Login failed', true);
                }
            } catch (error) {
                console.error('Login error:', error);
                showMessage('Login failed. Please try again.', true);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            
            if (formData.get('password') !== formData.get('confirm_password')) {
                showMessage('Passwords do not match', true);
                return;
            }

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: formData.get('username'),
                        password: formData.get('password'),
                        confirm_password: formData.get('confirm_password'),
                        real_name: formData.get('real_name')
                    })
                });

                const data = await response.json();
                if (response.ok && data.success) {
                    showMessage(data.message);
                    registerForm.reset();
                } else {
                    showMessage(data.error || 'Registration failed', true);
                }
            } catch (error) {
                console.error('Registration error:', error);
                showMessage('Registration failed. Please try again.', true);
            }
        });
    }
});