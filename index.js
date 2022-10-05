'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

// instance of a listening event server at http://localhost:3002/caps
const server = new Server(PORT);

// namespace
const caps = server.of('/caps');

// connect to server to client. The socket will appear once the handshale with the client is made
server.on('connection', (socket) => {
  console.log('Socket connected to event server', socket.id);

});

caps.on('connection', (socket) => {
  console.log('Connected to the CAPS namespace', socket.id);

  socket.on('JOIN', (room) => {
    console.log(`You have entered the ${room} room`);
  });


  // subscriptions to the socket

  socket.on('MESSAGE', (payload) => {
    console.log('Server message event', payload);
  });

  caps.on('PICKUP', (payload) => logEvent('PICKUP', payload));

  caps.on('TRANSIT', (payload) => logEvent('TRANSIT', payload));

  caps.on('DELIVERY', (payload) => logEvent('DELIVERY', payload));

  // sends to all parties in the socketEXCEPT the sender
  // socket.broadcast.emit('MESSAGE', payload);



  function logEvent(event, payload) {
    const date = new Date();
    const time = date.toTimeString();
    console.log('EVENT', { event, time, payload });
  }
});
