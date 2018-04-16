const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// User list
const users = new Users();

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// registers an event listener
// listen for a new connection
io.on('connection', socket => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    // io.to(roomName) - will send a message to everybody in the room
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // socket.broadcast(to) - same

    socket.emit(
      'newMessage',
      generateMessage('Admin', 'Welcome to the chat room!'),
    );

    socket.broadcast
      .to(params.room)
      .emit(
        'newMessage',
        generateMessage('Admin', `${params.name} has joined!`),
      );

    callback();
  });

  socket.on('createMessage', (newMessage, callback) => {
    const user = users.getUser(socket.id);

    if (user && isRealString(newMessage.text)) {
      io
        .to(user.room)
        .emit('newMessage', generateMessage(user.name, newMessage.text));
    }

    callback();
  });

  socket.on('createLocationMessage', coords => {
    const user = users.getUser(socket.id);

    if (user) {
      io
        .to(user.room)
        .emit(
          'newLocationMessage',
          generateLocationMessage(user.name, coords.latitude, coords.longitude),
        );
    }
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io
        .to(user.room)
        .emit(
          'newMessage',
          generateMessage('Admin', `${user.name} has left the room.`),
        );
    }
  });
});

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
