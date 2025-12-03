const obj = {
  name: "manyu",
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
    grades: [7, 4, 9],
  },
};

function deepCopy(obj) {
  if (["string", "number", "boolean"].includes(typeof obj)) {
    return obj;
  } else if (typeof obj === "object") {
    return Object.keys(obj).reduce((acc, curr) => {
      acc[curr] = deepCopy(obj[curr]);
      return acc;
    }, {});
  }
}

const res = deepCopy(obj);
res.name = "Sarah";
res.education.grades[2] = 10;
console.log(res);
console.log(obj);
