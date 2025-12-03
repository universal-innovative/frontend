const obj = {
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
const deepCopy = (obj) => {
  if (["string", "number", "boolean"].includes(typeof obj)) {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map((val) => deepCopy(val));
  } else if (typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = deepCopy(obj[key]);
      return acc;
    }, {});
  }
};

const obj2 = deepCopy(obj);
obj2.address.current.city = "random";
console.log(obj);

console.log(obj2);
