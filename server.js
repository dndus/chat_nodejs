const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, GetCurrentUser} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Here you set your static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on("connection", socket => {
    socket.on('joinroom', ({username, room}) => {
        const user = userJoin(socket.id, username, room)

        socket.join(user.room)

    // Welcome current user
    socket.emit('message', formatMessage('Chat bot', 'Welcome to Chat'));

    //Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message', formatMessage('Chat bot', `${user.username} has joined the chat`));

    })

    //Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = GetCurrentUser(socket.id)

        io.to(user.room).emit('message', formatMessage(user.username, msg))
    })

    // Runs when client left
    socket.on('disconnect', () => {
        io.emit('message', formatMessage('Chat bot', 'A use has left the chat'));
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));