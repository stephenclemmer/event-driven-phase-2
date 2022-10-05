'use strict';

const { io } = require('socket.io-client');

const socket = io('http://localhost:3002/caps');


const createTransitOrder = require('./transitOrder');
const transitOrder = createTransitOrder(socket);

const createDeliveryOrder = require('./deliverOrder');
const deliverOrder = createDeliveryOrder(socket);

socket.emit('JOIN', 'driver');

socket.on('PICKUP', transitOrder);

socket.on('TRANSIT', deliverOrder);

socket.on('disconnect', () => {
  console.log(socket.id);
});

