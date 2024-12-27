// login.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const loginEmail = document.getElementById('loginEmail').value;
  const loginPassword = document.getElementById('loginPassword').value;

  // Retrieve stored user data from localStorage (for demo purposes)
  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser && storedUser.email === loginEmail && storedUser.password === loginPassword) {
      // Redirect to home page after successful login
      window.location.href = 'index.html';
  } else {
      alert('Invalid credentials');
  }
});
localStorage.setItem('username', userEmail);