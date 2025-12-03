const LazyMan = class LazyMan {
  constructor(name, logger) {
    this.name = name;
    this.logger = logger;
    this.arr = [this.greet.bind(this)];
    setTimeout(() => this.print());
  }
  print() {
    const taskArray = this.arr;
    taskArray.forEach((fn) => fn());
  }
  greet() {
    this.logger(`Hi I'm ${this.name}`);
  }
  eat(val) {
    const fn = () => this.logger(`Eat ${val}`);
    this.arr.push(fn);
    return this;
  }
  sleep(m) {
    const fn = function () {
      this.logger(`Sleep for ${m} mins`);
    };
    this.arr.push(fn.bind(this));
    return this;
  }
  sleepFirst(m) {
    const fn = () => {
      this.logger(`Sleep first for ${m} mins`);
    };
    this.arr.unshift(fn);
    return this;
  }
};

const lazyMan = new LazyMan("Lazy Man", console.log);

lazyMan
  .eat("Banana")
  .eat("Apple")
  .sleep(10)
  .eat("banana")
  .sleep(2)
  .eat("Grapes")
  .sleepFirst(20);
