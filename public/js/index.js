var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(newMessage) {
    console.log('New message', newMessage);
    socket.emit('createMessage', {
        from: 'client',
        text: 'client emitted event'
    });
});