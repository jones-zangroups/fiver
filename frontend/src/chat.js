// fiverr_chat.js

// Get logged-in user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Display user info on chat page
if (user) {
    document.querySelector('.chat-container').innerHTML = `<h3>Welcome, ${user.username}!</h3>`;
}

// Dummy contacts
const contacts = [
  { name: 'PrettyPixels', img: '/img/profile1.jpeg', lastMessage: 'Hey! I need a new logo...' },
  { name: 'Michael Brown', img: '/img/profile2.jpeg', lastMessage: 'Sure, see you soon.' },
  { name: 'Jane Smith', img: '/img/profile3.jpeg', lastMessage: 'Can we talk later?' },
];

// Load contacts into sidebar
const contactList = document.getElementById('contact-list');
contacts.forEach(contact => {
    const contactDiv = document.createElement('div');
    contactDiv.classList.add('contact');
    contactDiv.innerHTML = `
      <img src="${contact.img}" alt="Profile" class="profile-pic">
      <div class="contact-info">
        <p>${contact.name}</p>
        <small>${contact.lastMessage}</small>
      </div>
    `;
    contactList.appendChild(contactDiv);
});

// Dummy chat messages
const messages = [
  { sender: 'PrettyPixels', message: 'Hi! Can you help with a new logo?', time: '3:15 PM' },
  { sender: 'user', message: 'Sure! What do you have in mind?', time: '3:20 PM' },
];

// Display chat messages
const chatBox = document.getElementById('chat-box');
messages.forEach(msg => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(msg.sender === 'user' ? 'message-sent' : 'message-received');
    messageDiv.innerHTML = `
        <p>${msg.message}</p>
        <span class="timestamp">${msg.time}</span>
    `;
    chatBox.appendChild(messageDiv);
});

// Handle sending messages
document.getElementById('send-btn').addEventListener('click', function() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message-sent');
        messageDiv.innerHTML = `
            <p>${message}</p>
            <span class="timestamp">Now</span>
        `;
        chatBox.appendChild(messageDiv);
        messageInput.value = ''; // Clear input field
    }
});
