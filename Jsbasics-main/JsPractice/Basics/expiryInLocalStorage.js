window.myLocalStorage = {
  setItem(key, value, expiry) {
    const data = {
      val: value,
      expiry: Date.now() + expiry,
    };
    localStorage.setItem(key, JSON.stringify(data));
  },
  getItem(key) {
    const result = JSON.parse(localStorage.getItem(key));
    if (result) {
      if (result.expiry <= Date.now()) {
        localStorage.removeItem(key);
        return null;
      } else {
        return result.val;
      }
    } else return null;
  },
};
myLocalStorage.setItem("foo", "bar", 1000);

setTimeout(() => {
  console.log(myLocalStorage.getItem("foo"));
}, 900);
