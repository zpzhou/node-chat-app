var socket = io();

function scrollToBottom() {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();

    if (clientHeight + scrollTop + newMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user))
    });

    jQuery('#users').html(ol);
});

socket.on('newMessage', function(newMessage) {
    var template = jQuery('#message-template').html();
    const sFormattedTimestamp = moment(newMessage.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        text: newMessage.text,
        from: newMessage.from,
        createdAt: sFormattedTimestamp
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    const template = jQuery("#location-message-template").html();
    const sFormattedTimestamp = moment(message.createdAt).format('h:mm a');
    const li = Mustache.render(template, {
        from: message.from,
        createdAt: sFormattedTimestamp,
        url: message.url
    });

    jQuery('#messages').append(li);
    scrollToBottom();
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