const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server); // create IO server

app.use(express.static(publicPath));
app.use(bodyParser.json()); // JSON to post handler

// register event listenr
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required');
        }
    });

    socket.on('createMessage', (newMessage, callback) => {
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', (socket) => {
        console.log('Client disconnected!');
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});