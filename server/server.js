const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIO(server); // create IO server

const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '../public');


app.use(express.static(publicPath));
app.use(bodyParser.json()); // JSON to post handler

// register event listenr
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        message: 'Welcome new user!',
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        message: 'A new user has joined the chat room',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
        socket.broadcast.
        socket.broadcast.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', (socket) => {
        console.log('Client disconnected!');
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});