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
function deepCopy(obj) {
  if (["string", "number", "boolean"].includes(typeof obj)) {
    return obj;
  } else if (typeof obj === "object") {
    return Object.keys(obj).reduce((acc, curr) => {
      acc[curr] = deepCopy(acc[curr]);
      return acc;
    }, {});
  }
}
const res = deepCopy(obj);
res.name = "punit";
console.log(res);
console.log(obj);
