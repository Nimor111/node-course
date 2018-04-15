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

  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: $('#message-input').val(),
    },
    function() {},
  );
});

const locationButton = $('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser!');
  }

  navigator.geolocation.getCurrentPosition(
    function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    function() {
      alert('Unable to fetch location!');
    },
  );
});
