//   When you define methods inside a class in JavaScript, they are added to the prototype chain, which allows all instances of the class to share the same method implementation. This results in more efficient memory usage because the method is stored only once in memory, regardless of how many instances of the class are created.
class Person {
  constructor(fname) {
    console.log(this);
  }
  getPersonInfo() {
    return this.name;
  }
}
const p1 = new Person("ravi");
