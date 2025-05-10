document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example credentials (replace with actual authentication logic)
    const validUsername = "User";
    const validPassword = "Password";

    if (username === validUsername && password === validPassword) {
        // Store login state in localStorage
        localStorage.setItem('isLoggedIn', true);

        // Redirect to the home page
        window.location.href = "beauty.html";
    } else {
        // Show error message
        document.getElementById('error-message').textContent = "Invalid username or password!";
    }
});