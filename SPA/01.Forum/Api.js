export async function request(method, url, body) {
  const options = {
    method,
  };
  if (body !== undefined) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }
  const response = await fetch(url, options);
  return await response.json();
}

// const url = `http://localhost:3030/jsonstore/collections/myboard/comments`;
//   const data = await response.json();
//   const response = await fetch(url);
//   const content = Object.values(data);
//   const correctComments = content.filter((x) => x["postId"] == postId);
//   document.querySelector(`.comment-section`).innerHTML = "";
//   correctComments.forEach((data) => renderNewComment(data));
// }
