const socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('New message', message);

  const li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#message-list').append(li);
});

socket.on('newLocationMessage', function(message) {
  const li = $('<li></li>');
  const anchor = $('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  anchor.attr('href', message.url);
  li.append(anchor);

  $('#message-list').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  const messageBox = $('#message-input');

  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: messageBox.val(),
    },
    function() {
      messageBox.val('');
    },
  );
});

const locationButton = $('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser!');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    function() {
      locationButton.removeAttr('disabled').text('Send location');
      alert('Unable to fetch location!');
    },
  );
});
