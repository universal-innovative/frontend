// function sum(a) {
//   let res = 0;
//   return (b) => {
//     if (b) {
//       return sum(a + b);
//     } else return (res += a);
//   };
// }
function sum(a) {
  return (b) => {
    if (b) return sum(a + b);
    return a;
  };
}

console.log(sum(1)(2)(3)(5)());

const user = {
  name: "Ravi",
  address: {
    state: "upttar pradesh",
    city: "mahmudabad",
    distric: "sitapur",
    postaladdress: {
      village: "khendaura",
      post: "mahmudabad",
      pincode: "261203",
    },
  },
  contact: {
    phone: "8948054902",
  },
};

let finalObj = {};

const print = (obj, parent) => {
  for (key in obj) {
    if (typeof obj[key] === "object") {
      print(obj[key], parent + "_" + key);
    } else {
      finalObj[parent + "_" + key] = obj[key];
    }
  }
};
function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepCopy);
  const copy = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  return copy;
}

print(user, "user");
// console.log(deepCopy(user));
console.log(finalObj);

//2nd solution for print user
let finalObj2 = {};
function printUser(name, user) {
  for (key in user) {
    if (typeof user[key] === "object") {
      return printUser(name + "_" + key, user[key]);
    } else {
      finalObj[name + "_" + key] = user[key];
    }
  }
}

printUser("user", user);
console.log(finalObj2);
