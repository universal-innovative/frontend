const Singleton = (function () {
  let instance = false;
  function CreateInstace() {
    (this.name = "test"), (this.age = 23);
  }
  return {
    getInstance: function () {
      if (!instance) {
        console.log("inside");
        instance = new CreateInstace();
      }
      return instance;
    },
  };
})();
const user1 = Singleton.getInstance();
const user2 = Singleton.getInstance();

console.log(user1);
console.log(user2);
console.log(user1 === user2);

//
const Singleton2 = (function () {
  let instance = false;
  function CreateInstace() {
    return {
      name: "test",
      age: 23,
    };
  }
  return {
    getInstance: function () {
      if (!instance) {
        console.log("inside");
        instance = CreateInstace();
      }
      return instance;
    },
  };
})();
const user3 = Singleton.getInstance();
const user4 = Singleton.getInstance();

console.log(user3);
console.log(user4);
console.log(user3 === user4);

//using classes
class SingleTon {
  constructor() {
    if (!SingleTon.instance) {
      this.value = "i am from class";
      SingleTon.instance = { x: 2 };
    }
    return SingleTon.value;
  }
  getInstance() {
    return this.value;
  }
}
const user = new SingleTon();
console.log(user);

console.log(SingleTon.instance);

const user5 = new SingleTon();
console.log(user5 === user);
