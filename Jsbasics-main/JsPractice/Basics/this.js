this.a = 5;

// function print() {
//   console.log(this.a);
// }

const print = () => {
  console.log(this.a);
};

print();
// in both cases  it will print 5 as this always points to parent object and here parent object of 'print()' is global object, thats why arrow function is also working

let user1 = {
  name: "ravi",
  age: "23",
  getInfo: function () {
    console.log(this.name);
  },
};
user1.getInfo();
//here this is pointing to its parent object which is 'user' and prints =>'ravi'

let user2 = {
  name: "ravi",
  age: "23",
  childObj: {
    newName: "mohan",
    getInfo: function () {
      console.log(this.newName, "and", this.name);
    },
  },
};
user2.childObj.getInfo();
//here this is pointing to its parent object which is 'childObj' and prints =>this.newName=>'ravi' and this.name=>undefined

let user3 = {
  name: "ravi",
  age: "23",
  getInfo: () => {
    console.log(this.name);
  },
};
user3.getInfo();
//   this in regular function always refers to the context of the function being called. However, in the arrow function, this has nothing to do with the caller of the function. It refers to the scope where the function (the enclosing context) is present. That’s why we get undefined.
let user4 = {
  name: "ravi",
  age: "23",
  getDetails() {
    const getInfo = () => {
      console.log(this.name);
    };
    getInfo();
  },
};
user4.getDetails();
// here this is pointing to 'user4'

// QnA
1;
const Info = {
  firstname: "ravi",
  getName() {
    const firstname = "mohan";
    return this.firstname;
  },
};
console.log(Info.getName());
// this will point to parent object='info'

2;
function makeUser() {
  return {
    name: "ravi",
    ref: this,
  };
}

const user = makeUser();
console.log(user.ref.name);
// gives undefined because this has parent object as window because we are calling it using 'makeUser'

// to make it work we can write it like this
function makeUser1() {
  return {
    name: "ravi1",
    ref() {
      return this;
    },
  };
}

const user5 = makeUser1();
console.log(user5.ref().name);

3;
const Info1 = {
  firstname: "setTimeout",
  getName() {
    console.log(this.firstname);
  },
};
setTimeout(Info1.getName, 1000);
// it will give undefined because setTimeout will consider 'Info1.getName' as call back function and it won't have access to 'user' object instead it will  point to golbal object. to make it work we can wrap it inside a function and it will work.

const Info2 = {
  firstname: "setTimeout2",
  getName() {
    console.log(this.firstname);
  },
};
setTimeout(function () {
  Info2.getName();
}, 1000);

4;

const user6 = {
  name: "abc",
  greet() {
    return `hello ${this.name}`;
  },
  farewell: () => {
    return `hello farewell ${this.name} `;
  },
};
console.log(user6.greet());
console.log(user6.farewell()); //will give undefined because it arrow function

5;

const calc = {
  total: 0,
  add: function (a) {
    this.total += a;
    return this;
  },
  multiply: function (a) {
    this.total *= a;
    return this;
  },
  substract: function (a) {
    this.total -= a;
    return this;
  },
};
const result = calc.add(10).multiply(5).substract(15).add(5);

console.log(result.total);
