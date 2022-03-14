const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Here you set your static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on("connection", socket => {
    console.log("New WS Connection...");
    socket.emit('message', 'Welcome to Chat')

    //Broadcast when a user connects
    socket.broadcast.emit('messgae', 'A user has joined the chat')
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));