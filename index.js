/**
 * Once Multi Event Listener
 * @param emitter
 * @param events
 */
module.exports = (emitter, events) => {
  events = Object.entries(events);
  const cb = {};
  events.forEach(([ event, handler ]) => {
    cb[event] = (...args) => {
      events.forEach(([ event, handler ]) => emitter.removeListener(event, cb[event]));
      handler(...args);
    };
    emitter.addListener(event, cb[event]);
  });
};
