'use strict';

const { io } = require('socket.io-client');

const socket = io('http://localhost:3002/caps');

socket.emit('JOIN', 'caps');

socket.on('connect', () => {
  console.log(socket.id);
});

const createInTransit = require('./sendMessage');
const inTransit = createInTransit(socket);

setInterval(() => {
  inTransit();
}, 3000);
