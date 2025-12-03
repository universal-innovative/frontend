class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, callback) {
    if (!this.events.eventName) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
    return this;
  }
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => fn(...args));
    }
    return this;
  }
  off(eventName, callback) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(
      (fn) => fn != callback
    );
    return this;
  }
}

const emmiter = new EventEmitter();

function greet(name) {
  console.log(`Hello, ${name}`);
}

emmiter.on("sayHello", greet);
emmiter.emit("sayHello", "Manyu");

emmiter.off("sayHello", greet);
emmiter.emit("sayHello", "Manyu");
