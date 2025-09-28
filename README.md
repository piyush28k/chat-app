📄 README.md
# 💬 Real-Time Chat App

A simple real-time chat application built using **Node.js, Express, Socket.IO,sql, HTML, CSS, and JavaScript**.  
Good for learning how Socket.IO works.

---

## 🚀 Features
- group chat in real-time  
- Username support (users can enter their name before sending messages)  
- Broadcast messages to all connected users  
- Shows last 50 messages when a new user joins  
- Lightweight and easy to understand (beginner-friendly)

---

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Real-time Communication:** Socket.IO  

---

## 📂 Project Structure


chat-app/
│
├── public/
│ ├── index.html # Frontend UI
│ ├── style.css # Basic styling
│ └── script.js # Client-side Socket.IO logic
│
├── server.js # Backend server
├── db.sql (sql code )
├── package.json # Node.js dependencies
└── README.md # Project documentation


---

## ⚙️ Installation & Setup

# Install MySql for better learning.

### 1. Clone the repo
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

2. Install dependencies
  npm install

3. Run the server
   npm start


The server will start at:
👉 http://localhost:3000

💻 Usage

Open http://localhost:3000 in your browser.

Enter your username and start chatting.

Open the same link in another tab (or browser) to simulate multiple users.

📸 Demo Screenshot
<img width="917" height="725" alt="image" src="https://github.com/user-attachments/assets/7d6ed73e-db45-4ac3-8631-66fc401b6269" />
<img width="1919" height="878" alt="image" src="https://github.com/user-attachments/assets/9ec311e2-ca6c-4800-a306-08becb698e77" />



🔮 Future Improvements

Add authentication (login/signup)

Support for private one-to-one messages

File and image sharing

Online/offline user status
