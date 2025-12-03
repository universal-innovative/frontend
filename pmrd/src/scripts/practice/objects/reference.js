let user = { name: "John" };

let admin = user; // copy the reference
console.log(admin === user);
console.log({ name: "John" } === { name: "John" });
let a = {};
let b = {};
console.log(a === b);

////////////

function checkAge(data) {
  if (data === { age: 18 }) {
    console.log("You are an adult!");
  } else if (data == { age: 18 }) {
    console.log("You are still an adult.");
  } else {
    console.log(`Hmm.. You don't have an age I guess`);
  }
}

checkAge({ age: 18 });

let person = { name: "Manyu" };
const members = [person];
person = null;

console.log(members);

///////////////////

function getInfo(member, year) {
  member.name = "Manyu";
  year = "1998";
}

const person1 = { name: "Sarah" };
const birthYear = "1997";

getInfo(person1, birthYear);

console.log(person1, birthYear);

//////////////

const food = ["🍕", "🍫", "🥑", "🍔"];
const info = { favoriteFood: food[0] };

info.favoriteFood = "🍝";

console.log(food);
////////////////
function compareMembers(person1, person2) {
  if (person1 !== person2) {
    console.log("Not the same!");
  } else {
    console.log("They are the same!");
  }
}

const person2 = { name: "Manyu" };

compareMembers(person2);
////////////
const myMap = new Map();
const myFunc = () => "greeting";

myMap.set(myFunc, "Hello world!");

//1
myMap.get("greeting");
//2
myMap.get(myFunc);
//3
myMap.get(() => "greeting");

class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }
}
//////
const counterOne = new Counter();
counterOne.increment();
counterOne.increment();

const counterTwo = counterOne;
counterTwo.increment();

console.log(counterOne.count);

const user1 = {
  email: "e@mail.com",
  password: "12345",
};

const updateUser = ({ email, password }) => {
  if (email) {
    Object.assign(user1, { email });
  }

  if (password) {
    user1.password = password;
  }

  return user1;
};

const updatedUser = updateUser({ email: "new@email.com" });

console.log(updatedUser === user1);
