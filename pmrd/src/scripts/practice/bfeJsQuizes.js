//
console.log("/------------ARROW FUNCTION WITH THIS------------/");
const obj = {
  dev: "bfe",
  a: function () {
    return this.dev; // normal function: 'this' = obj when called as obj.a()
  },
  b() {
    return this.dev; // method shorthand ≈ normal function: 'this' = obj
  },
  c: () => {
    return this.dev; // arrow: 'this' is lexical (NOT obj). Likely undefined
  },
  d: function () {
    return (() => {
      return this.dev; // arrow closes over 'this' from d(), which is obj
    })();
  },
  e: function () {
    return this.b(); // calls b with 'this' = obj
  },
  f: function () {
    return this.b; // returns the function reference (unbound)
  },
  g: function () {
    return this.c(); // calls arrow c (ignores call-site 'this')
  },
  h: function () {
    return this.c; // returns the arrow function itself
  },
  i: function () {
    return () => {
      return this.dev; // arrow closes over 'this' from i(), which is obj
    };
  },
};

// Outputs:
console.log(obj.a()); // 'bfe'
console.log(obj.b()); // 'bfe'
console.log(obj.c()); // undefined  (arrow 'this' isn’t obj)
console.log(obj.d()); // 'bfe'      (arrow inherits 'this' from d())
console.log(obj.e()); // 'bfe'
console.log(obj.f()()); // undefined  (unbound call to b ⇒ 'this' is global/undefined)
console.log(obj.g()); // undefined  (c ignores call-site 'this')
console.log(obj.h()()); // undefined  (calling returned arrow; its lexical 'this' isn’t obj)
console.log(obj.i()()); // 'bfe'      (returned arrow captured obj as 'this')

// Note:
// - Arrow functions don’t have their own 'this'; they capture from creation site.
// - Calling an unbound function (like obj.f()()) loses the original receiver.
//   In strict mode, 'this' becomes undefined; otherwise it falls back to the global object.

Promise.resolve(1)
  .then((val) => {
    console.log("1️⃣ First then - received:", val); // logs: 1
    return val + 1; // returns 2 → next then receives 2
  })
  .then((val) => {
    console.log("2️⃣ Second then - received:", val); // logs: 2
    // no return ⇒ implicitly returns undefined → next then gets undefined
  })
  .then((val) => {
    console.log("3️⃣ Third then - received:", val); // logs: undefined (previous .then returned nothing)

    // returns a new Promise chain
    return Promise.resolve(3).then((innerVal) => {
      console.log(
        "🌟 Inner then (inside Promise.resolve(3)) - received:",
        innerVal
      ); // logs: 3
      // inner .then returns undefined implicitly → next then will get undefined
    });
  })
  .then((val) => {
    console.log("4️⃣ Fourth then - received:", val); // logs: undefined (inner chain’s last then returned undefined)
    return Promise.reject(4); // returns a rejected Promise → triggers catch()
  })
  .catch((val) => {
    console.log("💥 Caught error - received:", val); // logs: 4
    // catch also returns undefined implicitly → chain resumes successfully with undefined
  })
  .finally((val) => {
    console.log("🧹 Finally - received (ignored value):", val); // logs: undefined
    // finally’s return value is ignored by the chain
    // its purpose is for cleanup — it doesn’t modify the resolved/rejected value
    return 10;
  })
  .then((val) => {
    console.log("✅ Final then - received:", val); // logs: undefined (finally doesn’t change chain value)
  });

/*
------------------------------------------------------------
📘 Full Output Order:

1️⃣ First then - received: 1
2️⃣ Second then - received: 2
3️⃣ Third then - received: undefined
🌟 Inner then (inside Promise.resolve(3)) - received: 3
4️⃣ Fourth then - received: undefined
💥 Caught error - received: 4
🧹 Finally - received (ignored value): undefined
✅ Final then - received: undefined
------------------------------------------------------------


1. Promise.resolve(1)
   - Starts a resolved promise with value 1.

2. First .then()
   - Callback runs, logs 1.
   - Returns 2 → next then gets 2.

3. Second .then()
   - Receives 2, logs it.
   - Returns nothing → next then gets undefined.

4. Third .then()
   - Receives undefined, logs it.
   - Returns a new Promise (Promise.resolve(3)).
   - Inside that promise, logs 3, returns undefined.
   - So outer .then() resolves with undefined again.

5. Fourth .then()
   - Receives undefined, logs it.
   - Returns a rejected promise with value 4 → goes to .catch().

6. .catch()
   - Catches the rejection, logs 4.
   - Returns undefined implicitly → chain continues normally.

7. .finally()
   - Always runs (whether resolved or rejected).
   - Logs undefined (finally callback doesn’t get the chain value).
   - Returns 10, but this is ignored — finally never alters chain flow.

8. Final .then()
   - Receives undefined (the value before finally).
   - Logs undefined.

------------------------------------------------------------
💡 Summary:
- If .then() has a FUNCTION → that function runs, and what it returns is passed to the next link.
- If .then() has a NON-FUNCTION → it’s ignored, and the value just passes through.
- If a .then() returns a PROMISE → the chain waits for it.
- If a .then() returns NOTHING → the next .then() receives undefined.
- .catch() converts a rejection into a resolved value (unless it rethrows).
- .finally() always runs, but its return value is ignored.
------------------------------------------------------------
*/

Promise.resolve(1) // Step 1: Starts with a resolved promise having value = 1
  .then(() => 2) // Step 2: Ignores the previous value (1), returns 2 → next value = 2
  .then(3) // Step 3: '3' is NOT a function, so this .then is ignored → value stays 2
  .then((value) => value * 3) // Step 4: Takes 2, multiplies by 3 → returns 6
  .then(Promise.resolve(4)) // Step 5: Passing a Promise instead of a function → ignored → value stays 6
  .then((val) =>
    console.log("/------------PROMISE CHAIN .THEN------------/", val)
  ); // Step 6: Logs 6

// ✅ Final Output: 6
// 🧠 Key Notes:
// - .then() expects a function as an argument. If you pass a non-function, it's ignored.
// - Always write .then(() => Promise.resolve(...)) if you want to chain another Promise.

for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i));
}
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i));
}

for (var i = 0; i < 5; i++) {
  ((i) => setTimeout(() => console.log(i), 0))(i);
}

new Promise((resolve, reject) => {
  resolve(1); // ✅ First call — Promise state changes from "pending" → "fulfilled" with value 1
  resolve(2); // ❌ Ignored — Promise is already settled (cannot resolve/reject again)
  reject("error"); // ❌ Ignored — Promise is already fulfilled
}).then(
  (value) => {
    console.log("✅ Fulfilled with value:", value);
  },
  (error) => {
    console.log("❌ Rejected with error:", error);
  }
);

/*
📘 Output:
✅ Fulfilled with value: 1

🧠 Explanation:

1️⃣ When you create a Promise, it starts in the "pending" state.

2️⃣ The first time you call either:
      - resolve(...) → moves to "fulfilled" state
      - reject(...)  → moves to "rejected" state

3️⃣ Once a Promise is settled (fulfilled or rejected),
    any further calls to resolve() or reject() are completely ignored.

   👉 So here:
       - resolve(1)  → works and sets the value to 1
       - resolve(2)  → ignored (already fulfilled)
       - reject('error') → ignored (cannot change from fulfilled → rejected)

4️⃣ The .then() handler for the "fulfilled" path runs with the first resolved value (1).

💡 Key Concept:
A Promise can settle (resolve or reject) **only once**.
After that, its state and result are immutable.
*/

let a = "bfe.dev";
a[0] = "c"; // ❌ Strings are immutable — this line does nothing
console.log(a); // logs: "bfe.dev"

/*
📘 Output:
bfe.dev

🧠 Explanation:

1️⃣ In JavaScript, strings are **immutable primitives**.
    - Once created, their contents cannot be changed directly.

2️⃣ When you try to assign to an index (e.g., a[0] = 'c'),
    JS does not throw an error — it simply ignores the assignment.

3️⃣ So, 'a' remains unchanged.

✅ If you actually want to modify a string, you must create a new one:
    Example:
      let a = 'bfe.dev'
      a = 'c' + a.slice(1)
      console.log(a)   // "cfe.dev"

💡 Key Concept:
  Strings in JavaScript behave like arrays for *reading* characters (a[0] works),
  but not for *writing* — they are immutable.
*/
const object = {
  a: 1,

  // Normal function
  b: function () {
    console.log("b() -> this.a =", this.a);
  },

  // Shorthand method (same as normal function)
  c() {
    console.log("c() -> this.a =", this.a);
  },

  // Arrow function → lexical 'this'
  d: () => {
    console.log("d() (arrow) -> this.a =", this.a);
  },

  // IIFE immediately runs once at definition time
  // It returns an arrow that permanently closes over that top-level 'this'
  e: (function () {
    return () => {
      console.log("e() (arrow in IIFE) -> this.a =", this.a);
    };
  })(),

  // Normal function returning an arrow that captures its 'this'
  f: function () {
    return () => {
      console.log("f() -> inner arrow this.a =", this.a);
    };
  },
};

// ─────────────────────────────
// 🧠 Execution begins here
// ─────────────────────────────

console.log("object.a =", object.a); // 1

object.b(); // 'this' = object → logs 1
object.b(); // same → logs 1

const b = object.b;
b(); // unbound → 'this' = global/undefined → logs undefined

object.b.apply({ a: 2 }); // 'this' manually set → logs 2

object.c(); // method shorthand → behaves same as normal function → logs 1

object.d(); // arrow ignores call-site → logs undefined (global this)
object.d(); // same
object.d.apply({ a: 2 }); // .apply ignored for arrows → logs undefined

object.e(); // arrow inside IIFE → captured top-level this → logs undefined
object.e(); // same
object.e.call({ a: 2 }); // .call ignored for arrow → logs undefined

object.f()(); // outer fn 'this' = object → inner arrow captures it → logs 1
object.f()(); // same → logs 1
object.f().call({ a: 2 }); // arrow's this fixed from creation → logs 1

/*
📘 Expected Output Order:

object.a = 1
b() -> this.a = 1
b() -> this.a = 1
b() -> this.a = undefined
b() -> this.a = 2
c() -> this.a = 1
d() (arrow) -> this.a = undefined
d() (arrow) -> this.a = undefined
d() (arrow) -> this.a = undefined
e() (arrow in IIFE) -> this.a = undefined
e() (arrow in IIFE) -> this.a = undefined
e() (arrow in IIFE) -> this.a = undefined
f() -> inner arrow this.a = 1
f() -> inner arrow this.a = 1
f() -> inner arrow this.a = 1
*/

/*
🧠 Summary of 'this' behavior:
───────────────────────────────
• Normal functions (`b`, `c`, `f`) → `this` depends on call-site.
• Arrow functions (`d`, `e`, inner of `f`) → `this` is lexically bound at creation.
• `.apply()` or `.call()` cannot change `this` for arrow functions.
• `f()` returns an arrow capturing `this` = object, so it always logs 1.
• `e()` returns an arrow capturing `this` from its defining IIFE (top-level/global).
───────────────────────────────
*/

// 🧩 JavaScript Coercion & Comparison Quiz

console.log(
  "1️⃣ JSON.stringify([1,2,null,3]) =",
  JSON.stringify([1, 2, null, 3])
);
// null is preserved in JSON arrays → [1,2,null,3]

console.log(
  "2️⃣ JSON.stringify([1,2,undefined,3]) =",
  JSON.stringify([1, 2, undefined, 3])
);
// undefined is removed (replaced by null only in objects, not arrays) → [1,2,null,3] ?? Let's see
// ❗ For arrays: undefined → null in JSON.stringify → [1,2,null,3]
// Actually: JSON.stringify([1,2,undefined,3]) → "[1,2,null,3]"

console.log("3️⃣ null === undefined ->", null === undefined);
// false → different types (strict equality checks type and value)

console.log("4️⃣ null == undefined ->", null == undefined);
// true → special case in loose equality; both are treated as “no value”

console.log("5️⃣ null == 0 ->", null == 0);
// false → null only loosely equals undefined, not numbers

console.log("6️⃣ null < 0 ->", null < 0);
// false → when comparing, null → 0 → 0 < 0 → false

console.log("7️⃣ null > 0 ->", null > 0);
// false → 0 > 0 → false

console.log("8️⃣ null <= 0 ->", null <= 0);
// true → 0 <= 0 → true

console.log("9️⃣ null >= 0 ->", null >= 0);
// true → 0 >= 0 → true

console.log("🔟 undefined == 0 ->", undefined == 0);
// false → undefined only loosely equals null

console.log("11️⃣ undefined < 0 ->", undefined < 0);
// false → undefined → NaN → comparison with NaN is always false

console.log("12️⃣ undefined > 0 ->", undefined > 0);
// false → NaN > 0 → false

console.log("13️⃣ undefined <= 0 ->", undefined <= 0);
// false → NaN <= 0 → false

console.log("14️⃣ undefined >= 0 ->", undefined >= 0);
// false → NaN >= 0 → false

/*
📘 Expected Output:

1️⃣ JSON.stringify([1,2,null,3]) = [1,2,null,3]
2️⃣ JSON.stringify([1,2,undefined,3]) = [1,2,null,3]
3️⃣ null === undefined -> false
4️⃣ null == undefined -> true
5️⃣ null == 0 -> false
6️⃣ null < 0 -> false
7️⃣ null > 0 -> false
8️⃣ null <= 0 -> true
9️⃣ null >= 0 -> true
🔟 undefined == 0 -> false
11️⃣ undefined < 0 -> false
12️⃣ undefined > 0 -> false
13️⃣ undefined <= 0 -> false
14️⃣ undefined >= 0 -> false

------------------------------------------------------------
🧠 Deep Explanation:
------------------------------------------------------------

1️⃣ JSON.stringify() rules:
   - undefined, functions, and symbols:
     • Removed in objects
     • Converted to null in arrays
   - null is preserved as null

2️⃣ Equality rules:
   - `===` → strict equality → no type conversion
   - `==` → loose equality → applies type coercion
     • null == undefined → true (special case)
     • null == 0 → false
     • undefined == 0 → false

3️⃣ Comparison rules (<, >, <=, >=):
   - null is converted to 0
   - undefined is converted to NaN
   - Any comparison with NaN → false
   - Hence:
       null <= 0 → 0 <= 0 → true
       null >= 0 → 0 >= 0 → true
       undefined <= 0 → NaN <= 0 → false
------------------------------------------------------------
💡 Summary Table:

| Expression           | Result   | Reason |
|----------------------|----------|--------|
| JSON.stringify([1,2,null,3]) | "[1,2,null,3]" | null kept |
| JSON.stringify([1,2,undefined,3]) | "[1,2,null,3]" | undefined → null in array |
| null === undefined   | false    | different types |
| null == undefined    | true     | special case |
| null == 0            | false    | no coercion match |
| null < 0             | false    | 0 < 0 false |
| null > 0             | false    | 0 > 0 false |
| null <= 0            | true     | 0 <= 0 true |
| null >= 0            | true     | 0 >= 0 true |
| undefined == 0       | false    | undefined only == null |
| undefined < 0        | false    | NaN < 0 false |
| undefined > 0        | false    | NaN > 0 false |
| undefined <= 0       | false    | NaN <= 0 false |
| undefined >= 0       | false    | NaN >= 0 false |
------------------------------------------------------------
*/

function func() {
  const a = (b = c = 1);
}
func();

console.log("typeof a =", typeof a);
console.log("typeof b =", typeof b);
console.log("typeof c =", typeof c);

/*
📘 Output:
typeof a = undefined
typeof b = number
typeof c = number
------------------------------------------------------------
🧠 Explanation:

Inside the function:
  const a = b = c = 1

JavaScript evaluates this line as:
  b = 1
  c = b
  const a = c

⚠️ But here’s the key detail:
  - Only `a` is declared with `const`.
  - `b` and `c` are assigned *without* `var`, `let`, or `const`.

In **non-strict mode**, assigning to an undeclared variable
automatically creates a global variable (a property of `window` or `globalThis`).

So effectively:
  inside func():
    b = 1   → creates global variable `b`
    c = 1   → creates global variable `c`
    const a = 1  → `a` is block-scoped (local to func)

When func() finishes:
  - `a` is destroyed (local variable)
  - `b` and `c` still exist globally

------------------------------------------------------------
✅ So after calling func():
typeof a → undefined  (doesn’t exist outside the function)
typeof b → "number"   (global variable)
typeof c → "number"   (global variable)

------------------------------------------------------------
💡 Tip:
Always declare every variable explicitly (with let/const/var)
to avoid polluting the global scope.

Strict mode would prevent this entirely:
  "use strict"
  function func() {
    const a = b = c = 1  // ❌ ReferenceError: b is not defined
  }
------------------------------------------------------------
*/

const arr1 = [0];

console.log("len after init ([0]) =", arr1.length); // 1

a[3] = 3; // creates a sparse array: [0, <empty>, <empty>, 3]
console.log("len after a[3] = 3 =", arr1.length); // 4

// for...of uses the array iterator → skips holes (doesn't call for missing indices)
console.log("for...of start");
for (let item of a) {
  console.log("for...of item =", item); // 0, 3
}
console.log("for...of end");

// map() skips holes (callback not called for missing indices)
console.log("map() start");
arr1.map((item) => {
  console.log("map item =", item); // 0, 3
});
console.log("map() end");

// forEach() also skips holes
console.log("forEach() start");
arr1.forEach((item) => {
  console.log("forEach item =", item); // 0, 3
});
console.log("forEach() end");

// Object.keys lists existing enumerable indices only (as strings)
console.log("Object.keys(a) =", Object.keys(a)); // ["0", "3"]

delete a[3]; // removes the property at index 3, leaves a hole; length doesn't change
console.log("len after delete a[3] =", arr1.length); // 4

a[2] = 2; // now array looks like [0, <empty>, 2, <empty>] (length still 4)

arr1.length = 1; // truncates array to 1 element, drops indices >= 1

console.log("final a[0], a[1], a[2] =", a[0], a[1], a[2]); // 0 undefined undefined

/*
📘 Expected log sequence:

len after init ([0]) = 1
len after a[3] = 3 = 4
for...of start
for...of item = 0
for...of item = 3
for...of end
map() start
map item = 0
map item = 3
map() end
forEach() start
forEach item = 0
forEach item = 3
forEach() end
Object.keys(a) = [ '0', '3' ]
len after delete a[3] = 4
final a[0], a[1], a[2] = 0 undefined undefined

🧠 Key points:
- Setting a[3] creates holes; length becomes highestIndex+1.
- for...of, map, forEach all **skip holes** (no callback for missing slots).
- delete leaves a hole and **does not** change length.
- Reducing length truncates the array and removes elements ≥ new length.
*/
const p1 = Promise.resolve(1);
// p1 → a resolved promise with value 1

const p2 = new Promise((resolve) => resolve(p1));
// resolves *with p1*, so it "adopts" p1’s state and value
// effectively p2 behaves exactly like p1

const p3 = Promise.resolve(p1);
// same as above → if resolved with a Promise, adopts that Promise’s state/value
// so p3 is also equivalent to p1

const p4 = p2.then(() => new Promise((resolve) => resolve(p3)));
// p2 resolves (same as p1) → .then() runs → returns a new Promise that resolves with p3
// so p4 is a new Promise that adopts p3’s state/value (1)
// ✅ same value as p1, but a different Promise object

const p5 = p4.then(() => p4);
// ⚠️ According to the Promise spec:
//    If a .then() callback returns the same Promise (self-return), it causes a TypeError
//    because a Promise cannot resolve to itself (circular reference).
//    So p5 becomes a **rejected Promise** with TypeError.

console.log("p1 == p2 ->", p1 == p2); // true  (p2 adopted p1)
console.log("p1 == p3 ->", p1 == p3); // true  (p3 adopted p1)
console.log("p3 == p4 ->", p3 == p4); // false (p4 is a new Promise, though it resolves with same value)
console.log("p4 == p5 ->", p4 == p5); // false (p5 is a rejected Promise, different object)

/*
📘 Expected Output:
p1 == p2 -> true
p1 == p3 -> true
p3 == p4 -> false
p4 == p5 -> false

------------------------------------------------------------
🧠 Deep Explanation:

1️⃣ Promise.resolve(promise)
   - If the argument is already a Promise → returns it unchanged.
   - So Promise.resolve(p1) === p1 → hence p1 == p3 → true.

2️⃣ new Promise(resolve => resolve(promise))
   - When resolving with another Promise → it **adopts** the inner Promise’s state/value.
   - So p2 behaves exactly like p1 → p1 == p2 → true.

3️⃣ Each .then() **always returns a new Promise**.
   - So p4 is *not the same object* as p1/p3 → p3 == p4 → false.

4️⃣ If a Promise tries to resolve with itself, JS detects a circular resolution chain.
   - p5 tries to resolve to p4 → creates self-dependency → rejected with TypeError.
   - p4 == p5 → false

------------------------------------------------------------
💡 Summary Table:

| Promise | Description | Equivalent To | Notes |
|----------|--------------|---------------|--------|
| p1 | Promise.resolve(1) | itself | resolves 1 |
| p2 | new Promise(resolve => resolve(p1)) | p1 | adopts p1 |
| p3 | Promise.resolve(p1) | p1 | adopts p1 |
| p4 | p2.then(() => Promise.resolve(p3)) | new Promise | resolves 1 but is a new object |
| p5 | p4.then(() => p4) | rejected | TypeError: Chaining cycle detected |

------------------------------------------------------------
*/
// 🧩 Case 1 — No initial value
[1, 2, 3].reduce((a, b) => {
  console.log("no init -> a:", a, "b:", b);
});

/*
Output:
no init -> a: 1 b: 2
no init -> a: undefined b: 3

Explanation:
- When no initial value is given:
  - First call: a = first element (1), b = 2
  - Since callback returns nothing → a becomes undefined next time.
  - Next call: a = undefined, b = 3
*/

// 🧩 Case 2 — With initial value
[1, 2, 3].reduce((a, b) => {
  console.log("init=0 -> a:", a, "b:", b);
}, 0);

/*
Output:
init=0 -> a: 0 b: 1
init=0 -> a: undefined b: 2
init=0 -> a: undefined b: 3

Explanation:
- With init (0): first a = 0, b = 1 (starts from index 0)
- Each next a = previous return value (undefined since nothing returned)
*/

// 🧠 Summary:
// reduce(callback, init?)
// - If init given → start from index 0, a = init
// - If no init → start from index 1, a = first element
// - If callback returns nothing → a becomes undefined
