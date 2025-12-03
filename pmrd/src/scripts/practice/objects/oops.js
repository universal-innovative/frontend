console.log("ABSTRACTION");
/**
 hiding the complex implementation details of an object and 
 exposing only the necessary and relevant parts to the outside world
 */
class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  startEngine() {
    console.log("Engine Started");
  }
  drive() {
    this.startEngine();
    console.log(`Driving ${this.make} ${this.model}`);
  }
}

const myCar = new Car("Toyota", "Corolla", 2021);

myCar.drive();

console.log("ENCAPSULATION");
/**
Encapsulation is the practice of bundling the data (attributes) and methods (functions) 
that operate on the data into a single unit or class, 
while restricting access to some of the object's components. 
This is achieved by defining public and private properties or methods.
 */

class BankAccount {
  #balance = 0;
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      console.log(`${amount} has been withdrawn from your bank acccount`);
    } else {
      console.log("Insufficient funds");
    }
  }
  getBalance() {
    return this.#balance;
  }
}

const myAccount = new BankAccount();
myAccount.deposit(1000);
myAccount.withdraw(500);
console.log("myAccount.getBalance(): ", myAccount.getBalance());
// console.log(myAccount.#balance); Private field '#balance' must be declared in an enclosing class

function Person(name) {
  var _name = name; // private variable
  return {
    getName: function () {
      return _name;
    },
    setName: function (newName) {
      _name = newName;
    },
  };
}

const newPerson = new Person("John");
console.log("newPerson.getName() before setName: ", newPerson.getName());
newPerson.setName("Jane");
console.log("newPerson.getName() after setName: ", newPerson.getName());
console.log("newPerson.name: ", newPerson.name);

console.log("INHERITANCE");

class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name} is eating`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // call the parent class contructor
    this.breed = breed;
  }
  bark() {
    console.log(`${this.name} is barking`);
  }
}

const myDog = new Dog("Gabar", "German Shephard");
myDog.eat();
myDog.bark();

console.log("POLYMORPHISM");
// allows objects of different classes to be treated as objects of a common superclass.

class Shape {
  draw() {
    console.log("Drawing a shape");
  }
}

class Circle extends Shape {
  draw() {
    console.log("Drawing a circle");
  }
}
class Rectangle extends Shape {
  draw() {
    console.log("Drawing a Rectangle");
  }
}

function renderShapes(shapes) {
  shapes.forEach((shape) => {
    shape.draw();
  });
}
const shapes = [new Circle(), new Rectangle()];
renderShapes(shapes);

class Point2d {
  x = null;
  y = null;
  getDoubleX = () => this.x * 2;
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.getTrippleX = () => this.x * 3;
  }
}

const point = new Point2d(3, 4);
console.log("getDoubleX()", point.getDoubleX());
console.log("getTrippleX()", point.getTrippleX());

console.log("STATIC");
/**
  Unlike instance propertis static properties are not tied to any instance of the class 
  but rather to the class itself.
  Static properties are initialized immediately after the class is defined, 
  not when an instance of the class is created.
  This means static properties are ready for use as soon as the class is loaded, unlike instance properties, 
  which are initialized during instantiation.
 */
class Test {
  static count = 0;
  name = "Manyu";
}
const a = new Test();
const b = new Test();

console.log("a.count", a.count);
console.log("Test.count", Test.count);

class Counter {
  static count = 0;
  constructor() {
    Counter.count++;
  }
}
const c1 = new Counter();
const c2 = new Counter();
console.log("Counter.count", Counter.count);

class PersonT {
  static planet = "Earth";
}
const p1 = new PersonT();
console.log("p1.constructor.planet", p1.constructor.planet);

class Parent {
  static role = "Parent";
}
class Child extends Parent {}
console.log("Child.role", Child.role);
Child.role = "Child";
console.log("Parent.role", Parent.role); //not affected; static props aren’t truly shared, just copied via prototype chain).
