/**
  The main concept of memory management in JavaScript is reachability.
  "reachable" values are those that are accessible or usable somehow. They are guaranteed 
  to be stored in memory.
  
  1 Base set: called roots, inherently reachable values, that cannot be deleted for obvious reasons.
    -  The current executing function, its local variables and parameters
    -  Other functions on the current chain of nested calls, their local variables and parameters
    - Global varaibles.
    - internal ones

  2 By reference: reachable from root by a reference or by a chain of references.
    if there’s an object in a global variable, and that object has a property referencing another object, 
    that object is considered reachable. And those that it references are also reachable

    There’s a background process in the JavaScript engine that is called garbage collector. 
    It monitors all objects and removes those that have become unreachable.

    Outgoing references do not matter. Only incoming ones can make an object reachable. 


    Internal algorithms
The basic garbage collection algorithm is called “mark-and-sweep”.

The following “garbage collection” steps are regularly performed:

The garbage collector takes roots and “marks” (remembers) them.
Then it visits and “marks” all references from them.
Then it visits marked objects and marks their references. All visited objects are remembered, so as not to visit the same object twice in the future.
…And so on until every reachable (from the roots) references are visited.
All objects except marked ones are removed.

 */

let config = {
  alert: setInterval(() => {
    console.log("Alert!");
  }, 1000),
};

config = null;

function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman,
  };
}

let family = marry(
  {
    name: "John",
  },
  {
    name: "Ann",
  }
);

delete family.father;
delete family.mother.husband;

console.log("family", family);
