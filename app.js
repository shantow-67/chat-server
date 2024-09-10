const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors"); // Import cors middleware

const app = express();
const server = http.createServer(app);

// Use CORS middleware before setting up routes or socket connections
app.use(
    cors({
        origin: "https://chat-client-lilac.vercel.app", // Allow requests from your React app
        methods: ["GET", "POST"],
    })
);

const io = new Server(server, {
    cors: {
        origin: "https://chat-client-lilac.vercel.app", // Allow requests from React
        methods: ["GET", "POST"],
    },
});

// Handle socket connections
io.on("connection", socket => {
    console.log(`a user connected . ID = ${socket.id}`);

    socket.on("message", msg => {
        console.log("message received: " + msg);

        io.emit("message", msg); // Broadcast message to all clients
        // socket.broadcast.emit("message", msg); //to others client
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
