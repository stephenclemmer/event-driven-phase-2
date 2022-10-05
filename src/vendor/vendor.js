'use strict';

let eventPool = require('../src/eventPool');
const Chance = require('chance');

const chance = new Chance();

eventPool.on('DELIVERY', confirmDelivery);

function confirmDelivery(payload){

  setTimeout(() => {
    console.log(`thank you ${payload.order.name}`);
    eventPool.emit('DELIVERY', payload);
  }, 6500);

}

setInterval(() => {
  const order = {
    store: chance.company(),
    orderId: chance.guid({ version: 3 }),
    name: chance.name(),
    address: chance.address(),
  };
  console.log('----new order begins----');
  eventPool.emit('PICKUP', {order});
}, 2500);
