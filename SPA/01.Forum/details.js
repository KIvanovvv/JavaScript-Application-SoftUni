import { btnHome } from "./home.js";

const section = document.querySelector(`#detailsView`);
const main = document.querySelector(`main`);
document.querySelector(`nav a`).addEventListener(`click`, (e) => {
  e.preventDefault();
  section.remove();
  btnHome();
});
section.remove();
let postId;
export function showDetails(id) {
  postId = id;
  main.appendChild(section);
  const form = section.querySelector(`form`);
  form.addEventListener(`submit`, onSubmit);
  getPost(postId);
  renderAllComments();
}

async function getPost(postId) {
  const url = `http://localhost:3030/jsonstore/collections/myboard/posts/${postId}`;
  const response = await fetch(url);
  const data = await response.json();
  renderPost(data);
}
function renderPost(data) {
  const div = document.createElement(`div`);
  div.setAttribute(`class`, "post");
  div.innerHTML = `
  <div class="theme-title">
                  <div class="theme-name-wrapper">
                    <div class="theme-name">
                      <h2>${data.topicName}</h2>
                    </div>
                  </div>
                </div>
                <!-- comment  -->

                <div class="comment">
                  <div class="header">
                    <img src="./static/profile.png" alt="avatar" />
                    <p>
                      <span>${data.username}</span> posted on
                      <time>${data.date}</time>
                    </p>

                    <p class="post-content">${data.postText}</p>
                  </div>
                </div>`;
  document.querySelector(`.post-section`).replaceChildren(div);
}

async function onSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const { postText, username } = Object.fromEntries(formData);
  //TODO make async func to create post comment with ID of current Post then func to render newpost
  const data = await createNewComment({
    postText,
    username,
    postId,
    date: new Date(),
  });
  formClear(form);
}
function formClear(form) {
  return form.reset();
}
async function renderAllComments() {
  const url = `http://localhost:3030/jsonstore/collections/myboard/comments`;
  const response = await fetch(url);
  const data = await response.json();
  const content = Object.values(data);
  const correctComments = content.filter((x) => x["postId"] == postId);
  document.querySelector(`.comment-section`).innerHTML = "";
  correctComments.forEach((data) => renderNewComment(data));
}

function renderNewComment(data) {
  const div = document.createElement(`div`);
  div.setAttribute(`class`, `comment`);
  div.innerHTML = `
  <div id="user-comment">
  <div class="topic-name-wrapper">
    <div class="topic-name">
      <p>
        <strong>${data.username}</strong> commented on
        <time>${data.date}</time>
      </p>
      <div class="post-content">
        <p>${data.postText}</p>
      </div>
    </div>
  </div>
</div>
</div>`;
  document.querySelector(`.comment-section`).appendChild(div);
}

async function createNewComment(body) {
  const url = `http://localhost:3030/jsonstore/collections/myboard/comments`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  renderNewComment(data);
  return data;
}
