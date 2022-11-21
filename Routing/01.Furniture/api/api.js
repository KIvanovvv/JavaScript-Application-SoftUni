const host = `http://localhost:3030/`;

async function request(method, url, body) {
  const options = {
    method,
    headers: {},
  };
  if (body != undefined) {
    options.headers["Content-type"] = "application/json";
    options.body = JSON.stringify(body);
  }
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    options.headers["X-Authorization"] = user.accessToken;
  }
  try {
    const res = await fetch(host + url, options);

    if (res.ok == false) {
      if (res.status == 403) {
        localStorage.clear();
      }
      const error = await res.json();
      throw new Error(error.message);
    }
    if (res.status == 204) {
      return res;
    } else {
      return res.json();
    }
  } catch (err) {
    alert(err.message);
    throw err;
  }
}

const get = request.bind(null, "get");
const post = request.bind(null, "post");
const put = request.bind(null, "put");
const del = request.bind(null, "delete");

export { get, post, put, del as delete };
