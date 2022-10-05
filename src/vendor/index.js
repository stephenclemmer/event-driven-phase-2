'use strict';

const { io } = require('socket.io-client');

const socket = io('http://localhost:3002/caps');

const Chance = require('chance');

const chance = new Chance();

socket.emit('JOIN', 'caps');

socket.on('connect', () => {
  console.log(socket.id);

  setInterval(() => {
    const order = {
      store: chance.company(),
      orderId: chance.guid({ version: 3 }),
      name: chance.name(),
      address: chance.address(),
    };
    console.log('----Call for PICKUP----');
    socket.emit('PICKUP', {order});
  }, 9000);

});

socket.on('disconnect', () => {
  console.log('Your connection has been disconnected!', socket.id);
});
