const socket = io();


const messagesEl = document.getElementById('messages');
const form = document.getElementById('msgForm');
const input = document.getElementById('messageInput');
const usernameInput = document.getElementById('username');


function addMessage(obj, me=false){
const li = document.createElement('li');
li.className = me ? 'me' : '';
const time = new Date(obj.created_at);
li.innerHTML = `<strong>${escapeHtml(obj.username)}</strong> <small style="color:#666;margin-left:8px">${time.toLocaleString()}</small><div>${escapeHtml(obj.message)}</div>`;
messagesEl.appendChild(li);
messagesEl.scrollTop = messagesEl.scrollHeight;
}


function escapeHtml(unsafe) {
return String(unsafe)
.replace(/&/g, "&amp;")
.replace(/</g, "&lt;")
.replace(/>/g, "&gt;")
.replace(/"/g, "&quot;")
.replace(/'/g, "&#039;");
}


socket.on('previousMessages', (msgs) => {
msgs.forEach(m => addMessage(m, false));
});


socket.on('newMessage', (m) => {
const me = (usernameInput.value && m.username === usernameInput.value);
addMessage(m, me);
});


form.addEventListener('submit', (e) => {
e.preventDefault();
const message = input.value.trim();
const username = (usernameInput.value || 'Anonymous').trim();
if (!message) return;
socket.emit('chatMessage', { username, message });
input.value = '';
});