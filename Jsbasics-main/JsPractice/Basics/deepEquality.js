const obj1 = {
  name: "ravi",
  contact: {
    phone: {
      phone1: "1234567890",
      phone2: "0987654321",
    },
    mail: {
      mail1: "abc@gami.com",
      mail2: "xyz@gami.com",
    },
  },
  address: {
    current: {
      city: "blr",
      pin: "260102",
    },
    permanent: {
      city: "lko",
      pin: "261203",
    },
  },
  education: {
    school: "sita",
    college: "jsr",
  },
};
const obj2 = {
  name: "ravi",
  contact: {
    phone: {
      phone1: "1234567890",
      phone2: "0987654321",
    },
    mail: {
      mail1: "abc@gami.com",
      mail2: "xyz@gami.com",
    },
  },
  address: {
    current: {
      city: "blr",
      pin: "260102",
    },
    permanent: {
      city: "lko",
      pin: "261203",
    },
  },
  education: {
    school: "sita",
    college: "jsr",
  },
};
function deepEquaity(a, b) {
  if (a === b) return true;
  if (
    a == null ||
    b == null ||
    typeof a !== "object" ||
    typeof b !== "object"
  ) {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEquaity(a[key], b[key])) {
      return false;
    }
  }
  return true;
}
deepEquaity(obj1, obj2);

console.log(deepEquaity(obj1, obj2));
