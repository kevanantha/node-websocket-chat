const express = require('express');
const socket = require('socket.io');

// app setup
const app = express();

// static files
app.use(express.static('public'));

// server
const server = app.listen(4000, () => {
  console.log('Server run in port http://localhost:4000');
});

// setup socket
const io = socket(server);

io.on('connection', (socket) => {
  console.log('made socket connetion', socket.id);

  // handle chat event
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});