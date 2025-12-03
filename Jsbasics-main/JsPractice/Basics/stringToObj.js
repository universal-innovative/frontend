function stringToObject(path, value) {
  const arr = path.split(".");
  const convertToObj = (arr, obj, value) => {
    const key = arr.shift();
    if (!obj[key]) {
      console.log("inside if 1");
      obj[key] = arr.length === 0 ? value : {};
    }
    if (arr.length > 0) {
      console.log("inside if 2");
      obj[key] = convertToObj(arr, obj[key], value);
    }
    return obj;
  };
  return convertToObj(arr, {}, value);
}

const res = stringToObject("a.b.c", "someValue");
console.log(res);
// {a:{b:{c:'value'}}}
