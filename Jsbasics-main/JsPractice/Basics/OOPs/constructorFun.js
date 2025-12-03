function printInfo() {
  console.log(this.name, this.lastName);
}
function createUser(firstName, lastName, age) {
  const user = {};
  (user.name = firstName), (user.lastName = lastName);
  user.age = age;
  user.printInfo = createUser.printInfo;
  return user;
}

// one way of declayring common function for each intance

createUser.printInfo = function () {
  console.log(this.name, this.lastName);
};

const user1 = createUser("ravi", "kanaujiya", 24);
const user2 = createUser("punit", "jain", 23);

// console.log(user2.printInfo());
// console.log(user2.printInfo === user1.printInfo); //true

// --------------consttructor function and new keyword-----------------//

// constructor function always points to the same function
// new key word will always return an object doesnt matter what we are retuning from the funtion
// when we new keyword it creates an object and returns it and 'this keyword' will point to that returned object(we dont need to return anything)

function sayHi() {
  console.log(this);
}

//console without new key word

sayHi(); // here 'this' will point to window object and window object will be visible in console and it is a normal function

//console with new key word

new sayHi(); // here 'this' will point of returned empty ('{}') object and we we call sayHi() a constructor function

// expample for constructor function

function createPerson(fname, age) {
  (this.name = fname), (this.age = age);
}
// we can define any properties in prototype object of 'createPerson' and those all will available in all instances of 'createPerson'
createPerson.prototype.getPersonInfo = function () {
  console.log(this.name, this.age);
};
//above 'this' will point to returend empty object and we can add properties using 'this' keyword and those will get added to the returned object
const p = createPerson("ravi", 24); //prints undefined (no new keyword)
//properties will get create in window object because 'this' will point to window object here

const p1 = new createPerson("ravi", 24);
// console.log(createPerson.prototype);

// console.log(p1); //prints ans object
