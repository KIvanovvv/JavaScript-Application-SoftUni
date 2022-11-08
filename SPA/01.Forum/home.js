import { showDetails } from "./details.js";

const section = document.querySelector(`#homeView`);
const main = document.querySelector(`main`);
const form = document.querySelector(`form`);
form.addEventListener(`submit`, onSubmit);

section.remove();
export function showHome() {
  renderAllPosts();
  main.appendChild(section);
}

async function renderAllPosts() {
  const url = `http://localhost:3030/jsonstore/collections/myboard/posts`;
  const response = await fetch(url);
  const data = await response.json();
  Object.values(data).map((data) => renderNewPost(data));
}

async function onSubmit(e) {
  e.preventDefault();
  if (e.submitter.className == `cancel`) {
    return formClear();
  }
  const formData = new FormData(e.target);
  const { topicName, username, postText } = Object.fromEntries(formData);

  const data = await createPost({
    topicName,
    username,
    postText,
    date: new Date(),
  });
  formClear();
  renderNewPost(data);
}

function renderNewPost(data) {
  const div = document.createElement(`div`);
  div.setAttribute(`class`, `topic-container`);
  div.innerHTML = `
  <div class="topic-name-wrapper">
  <div class="topic-name">
    <a href="#" class="normal" id="${data._id}" >
      <h2 >${data.topicName}</h2>
    </a>
    <div class="columns">
      <div>
        <p>Date: <time>${data.date}</time></p>
        <div class="nick-name">
          <p>Username: <span>${data.username}</span></p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>`;
  div.querySelector("a").addEventListener(`click`, showDetails);
  document.querySelector(`.topic-title`).appendChild(div);
}
async function createPost(body) {
  const url = `http://localhost:3030/jsonstore/collections/myboard/posts`;
  const response = await fetch(url, {
    method: `POST`,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}
function formClear() {
  return form.reset();
}
