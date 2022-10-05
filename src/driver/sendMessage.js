'use strict';


module.exports = (socket) => (text) => {
  socket.emit('TRANSIT', text);
};

// inTransit(socket)(payload);
