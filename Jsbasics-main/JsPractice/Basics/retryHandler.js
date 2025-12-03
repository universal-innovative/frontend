async function fetchWithRetry(url, retry = 3, delay = 3000) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return response;
    } else {
      throw new Error("error");
    }
  } catch (err) {
    if (retry > 0) {
      console.log("retrying");
      await new Promise((res, rej) => setTimeout(res, delay));
      return fetchWithRetry(url, (retry = retry - 1));
    } else {
      throw err;
    }
  }
}
fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1")
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
