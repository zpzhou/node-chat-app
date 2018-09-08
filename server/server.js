const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server); // create IO server
var users = new Users();

app.use(express.static(publicPath));
app.use(bodyParser.json()); // JSON to post handler

// register event listenr
io.on('connection', (socket) => {
    console.log('New user connected');


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUsersList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    });

    socket.on('createMessage', (newMessage, callback) => {
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUsersList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
        console.log('Client disconnected!');
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});