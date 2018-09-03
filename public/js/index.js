var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(newMessage) {
    var li = jQuery('<li></li>');
    const sFormattedTimestamp = moment(newMessage.createdAt).format('h:mm a');
    li.text(`${newMessage.from} ${sFormattedTimestamp}: ${newMessage.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    const sFormattedTimestamp = moment(message.createdAt).format('h:mm a');

    li.text(`${message.from} ${sFormattedTimestamp}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

var locationBtn = jQuery('#send-location');
locationBtn.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    locationBtn.attr('disabled', 'disabled').text('Sending locacation...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationBtn.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }, function() {
        alert('Unable to fetch location.');
        locationBtn.removeAttr('disabled').text('Send location');
    });
});