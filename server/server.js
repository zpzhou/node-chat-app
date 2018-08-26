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

    socket.emit('newMessage', { // listen on client side
        from: 'server',
        text: 'server emitted event',
        createdAt: Date.now()
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
    });

    socket.on('disconnect', (socket) => {
        console.log('Client disconnected!');
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});