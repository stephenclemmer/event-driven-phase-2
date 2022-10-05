'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

// instance of a listening event server at http://localhost:3002/caps
const server = new Server(PORT);

// namespace
const caps = server.of('/caps');


server.on('connection', (socket) => {
  console.log('Socket connected to event server', socket.id);

});

caps.on('connection', (socket) => {
  console.log('Connected to the CAPS namespace', socket.id);

  socket.on('JOIN', (room) => {
    console.log(`You have entered the ${room} room`);
  });

  socket.on('PICKUP', (payload) => {
    logEvent('PICKUP', payload);
    caps.emit('PICKUP', payload);
  });

  socket.on('TRANSIT', (payload) => {
    logEvent('TRANSIT', payload);
    caps.emit('TRANSIT', payload);
  });

  socket.on('DELIVERY', (payload) => {
    logEvent('DELIVERY', payload);
    caps.emit('DELIVERY', payload);
  });

});

function logEvent(event, payload) {
  const date = new Date();
  const time = date.toTimeString();
  console.log('EVENT', { event, time, payload });
}
