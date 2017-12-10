# Once-Multi-EventListener
Once-Multi-EventListener is a NodeJS package used to add multiple event listeners to an emitter only for one usage. This means that when one of the events is emitted all the listeners are dropped.

### Installation
```sh
npm i -S once-multi-eventlistener
```
### Usage
```js
const onceMultiEventListener(emitter, {
    event1: (a, b) => {
        console.log('event1 emitted.');
    },
    event2: (c) => {
        console.log('event2 emitted.');
    },
    event3: () => {
        console.log('event3 emitted.');
    }
});
```
### Example
```js
const net = require('net');
const onceMultiEventListener = require('once-multi-eventlistener');

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
```
