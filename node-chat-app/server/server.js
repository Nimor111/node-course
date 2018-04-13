const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

  socket.emit('newMessage', {
    from: 'Ivan',
    text: 'Sup',
    createdAt: 123,
  });

  socket.on('createMessage', newMessage => {
    console.log('Sent a message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
