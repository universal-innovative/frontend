function cachedApiCall(delay) {
  const cache = {};
  return async (url, configs = {}) => {
    const key = `${url}${JSON.stringify(configs)}`;

    if (!cache[key]) {
      const resp = await fetch(url);
      const val = await resp.json();
      cache[key] = { data: val, expiry: Date.now() + delay };
      console.log("calling api");
      console.log("cache", cache);

      return cache[key].data;
    } else {
      if (Date.now() - cache[key].expiry > 0) {
        const resp = await fetch(url);
        const val = await resp.json();
        cache[key] = { data: val, expiry: Date.now() + delay };
        console.log("cache expired calling api");
        return val;
      }
      console.log("returning from cache");
      return cache[key].data;
    }
  };
}

const call = cachedApiCall(2000);
call("https://jsonplaceholder.typicode.com/todos/1", {}).then((res) =>
  console.log(res)
);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((res) =>
    console.log(res)
  );
}, 800);
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((res) =>
    console.log(res)
  );
}, 3000);
