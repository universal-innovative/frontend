function BankAccount(customername, balance = 0) {
  this.customername = customername;
  this.accountNumber = Date.now();
  this.balance = balance;

  //   this.deposit = function (amount) {
  //     this.balance += amount;
  //   };
  //   this.withdrawn = (amount) => {
  //     this.balance -= amount;
  //   };
}
BankAccount.prototype.print = function () {
  console.log(`${this.accountNumber} and ${this.balance}`);
};
BankAccount.prototype.deposit = function (amount) {
  this.balance += amount;
};
BankAccount.prototype.withdrawn = function (amount) {
  this.balance -= amount;
};

// since every time we create any account 'deposit' and 'withdrawn' will also be recreated so to make them common we use prototype

const raviAccount = new BankAccount("Ravi", 1000);
raviAccount.withdrawn(500);
console.log(raviAccount);

// ES5 Function Constructor: this needs to be explicitly bound using methods like bind, apply, or call.
const raviAccount2 = new BankAccount("Ravi", 1000);
const prnt = raviAccount2.print;
prnt.call(raviAccount2);

// this concept in calling functions

function Person(names, age = 0) {
  this.names = names;
  this.age = age;
  function Person(names, age = 0) {
    this.names = names;
    this.age = age;

    //   this will work because this takes value for its lexical scope
    this.introduce = () => {
      return `Hello, my name is ${this.names} and I am ${this.age} years old.`;
    };

    //   this will not work
    this.introduce = function () {
      return `Hello, my name is ${this.names} and I am ${this.age} years old.`;
    };
  }

  const john = new Person("John", 30);
  const newIntroduce = john.introduce;

  console.log(newIntroduce());

  class Person2 {
    constructor(name, age) {
      this.myName = name;
      this.age = age;
    }

    introduce = () => {
      return `Hello, my name is ${this.myName} and I am ${this.age} years old.`;
    };
  }

  const john2 = new Person2("John", 30);
  const newIntroduce2 = john2.introduce;
  console.log(newIntroduce2());
}

const john = new Person("John", 30);
const newIntroduce = john.introduce;

console.log(newIntroduce());

class Person2 {
  constructor(name, age) {
    this.myName = name;
    this.age = age;
  }

  introduce = () => {
    return `Hello, my name is ${this.myName} and I am ${this.age} years old.`;
  };
}

const john2 = new Person2("John", 30);
const newIntroduce2 = john2.introduce;
console.log(newIntroduce2());
