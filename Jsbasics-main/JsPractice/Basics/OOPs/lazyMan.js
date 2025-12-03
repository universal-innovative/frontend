class LazyMan {
  constructor(name, logger) {
    this.name = name;
    this.logger = logger;
    this.arr = [this.greet.bind(this)];
    setTimeout(() => this.print());
  }
  print() {
    const taskArray = this.arr;
    taskArray.forEach((fun) => fun());
  }
  greet() {
    this.logger(`Hi I'm ${this.name}`);
  }
  eat(val) {
    const fn = function () {
      this.logger(`Eat ${val}`);
    };
    this.arr.push(fn.bind(this));
    return this;
  }
  sleep(val) {
    const fn = function () {
      this.logger(`Sleep for ${val} mins`);
    };
    this.arr.push(fn.bind(this));
    return this;
  }
  sleepFirst(val) {
    const fn = function () {
      this.logger(`SleepFirst for ${val} mins`);
    };
    this.arr.unshift(fn.bind(this));
    return this;
  }
}

const lazyMan = new LazyMan("Lazy Man", console.log);

lazyMan
  .eat("Banana")
  .eat("Apple")
  .sleep(10)
  .eat("banana")
  .sleep(2)
  .eat("Grapes")
  .sleepFirst(20);
