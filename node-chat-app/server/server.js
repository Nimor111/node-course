const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// registers an event listener
// listen for a new connection
io.on('connection', socket => {
  console.log('New user connected');

  socket.emit(
    'newMessage',
    generateMessage('Admin', 'Welcome to the chat room!'),
  );

  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'New user just joined!'),
  );

  socket.on('createMessage', (newMessage, callback) => {
    console.log('Sent a message', newMessage);

    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback('This is the acknowledgment from the server');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
