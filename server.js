const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mysql = require("mysql2/promise");
const path = require("path");

// === CONFIG ===
const PORT = process.env.PORT || 3000;
const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "Hogaya@18",
  database: process.env.DB_NAME || "chat_app",
  waitForConnections: true,
  connectionLimit: 10,
};

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

let pool;
(async function initDB() {
  try {
    pool = mysql.createPool(DB_CONFIG);

    // ensure table exists
    const create = `
    CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    await pool.query(create);
    console.log("Connected to MySQL and ensured messages table exists");
  } catch (err) {
    console.error("DB init error:", err);
    process.exit(1);
  }
})();

io.on("connection", async (socket) => {
  console.log("a user connected:", socket.id);

  // Send last 50 messages to the connected client
  try {
    const [rows] = await pool.query(
      "SELECT * FROM messages ORDER BY created_at DESC LIMIT 50"
    );
    // send in chronological order
    socket.emit("previousMessages", rows.reverse());
  } catch (err) {
    console.error("Error fetching messages:", err);
  }

  socket.on("chatMessage", async (data) => {
    // data: { username, message }
    if (!data || !data.message) return;
    const username = String(data.username || "Anonymous").slice(0, 50);
    const message = String(data.message).slice(0, 2000);

    try {
      await pool.query(
        "INSERT INTO messages (username, message) VALUES (?, ?)",
        [username, message]
      );
      const msgObj = { username, message, created_at: new Date() };
      io.emit("newMessage", msgObj);
    } catch (err) {
      console.error("Error inserting message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
