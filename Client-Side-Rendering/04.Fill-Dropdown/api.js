async function requester(method, url, body) {
  const options = {
    method,
    headers: {},
  };
  if (body) {
    options.body = JSON.stringify(body);
    options.headers = { "Content-Type": "application/json" };
  }
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

const get = requester.bind(null, "GET");
const post = requester.bind(null, "POST");

export { get, post };
