const net = require('net');
const onceMultiEventListener = require('./index');

const socket = new net.Socket();
/**
 * Listen multiple events on this socket for once
 */
onceMultiEventListener(
  socket,
  {
    'data': (data) => {
      console.log('data event emitted. Current events:', socket.eventNames());
      socket.destroy();
    },
    'error': (err) => {
      console.log('error event emitted. Current events:', socket.eventNames());
      socket.destroy();
    },
    'close': () => {
      console.log('close event emitted. Current events:', socket.eventNames());
      socket.destroy();
    }
  }
);
/**
 * Log listening events on this socket
 */
console.log('Current events:', socket.eventNames()); // [..., 'data', 'error', 'close']
/**
 * Try to connect 127.0.0.1 on a closed port
 * (error event should emitted)
 */
socket.connect(88, '127.0.0.1');
