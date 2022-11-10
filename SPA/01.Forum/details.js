import { request } from "./Api.js";
import { btnHome } from "./home.js";
import { formClear, getFormData } from "./utils.js";

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
  renderPost(await request("Get", url));
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
  let date = new Date();
  date = date.toDateString();
  const body = Object.assign(getFormData(e), { date, postId });
  const data = await createNewComment(body);
  formClear();
}

async function renderAllComments() {
  const content = Object.values(
    await request(
      "Get",
      `http://localhost:3030/jsonstore/collections/myboard/comments`
    )
  );
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
  const data = await request("POST", url, body);
  renderNewComment(data);
  return data;
}
