// index.js
document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  console.log("JavaScript is connected!");

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Save the user's data to localStorage (for demo purposes)
  localStorage.setItem('user', JSON.stringify({ username, email }));

  // Redirect to the chat page
  window.location.href = 'fiverr_chat.html';
});
