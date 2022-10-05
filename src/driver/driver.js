'use strict';

let eventPool = require('../src/eventPool');

eventPool.on('PICKUP', driverHandler);

function driverHandler(payload) {

  setTimeout(() => {
    console.log(`in transit ${payload.order.orderId}`);
    eventPool.emit('TRANSIT', payload);
  }, 6000);

  setTimeout(() => {
    console.log(`delivered ${payload.order.orderId}`);
    eventPool.emit('DELIVERY', payload);
  }, 6500);
}

module.exports = driverHandler;
