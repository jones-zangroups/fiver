// register.js
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Save user data (for demo, this can be stored in localStorage or a database in production)
  localStorage.setItem('user', JSON.stringify({ username, email, password }));

  // Redirect to login page after registration
  window.location.href = 'login.html';
});
