const EventEmitter = require("events");

class MyEmitter extends EventEmitter {
  constructor() {
    super();
    this.emit("created", "emitter");
  }
}

module.exports = MyEmitter;
