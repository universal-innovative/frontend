let animal = {
  eats: true,
};
let rabbit = {
  jumps: true,
};

rabbit.__proto__ = animal;

console.log(rabbit.eats);
console.log(rabbit.jumps);
/*
 The __proto__ property is a bit outdated. It exists for historical reasons, modern JavaScript suggests that 
  we should use Object.getPrototypeOf/Object.setPrototypeOf functions instead that get/set the prototype. 
 We’ll also cover these functions later.

The object referenced by [[Prototype]] is called a “prototype”.
If we want to read a property of obj or call a method, and it doesn’t exist, then JavaScript tries to find it in the prototype.
Write/delete operations act directly on the object, they don’t use the prototype (assuming it’s a data property, not a setter).
If we call obj.method(), and the method is taken from the prototype, this still references obj. 
So methods always work with the current object even if they are inherited.
The for..in loop iterates over both its own and its inherited properties. 
All other key/value-getting methods only operate on the object itself.
*/
