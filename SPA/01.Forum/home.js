import { request } from "./Api.js";
import { showDetails } from "./details.js";
import { formClear, getFormData } from "./utils.js";

const section = document.querySelector(`#homeView`);
const main = document.querySelector(`main`);
const form = document.querySelector(`form`);

form.addEventListener(`submit`, onSubmit);

section.remove();
export function showHome() {
  renderAllPosts();
  main.appendChild(section);
}
export function btnHome() {
  main.appendChild(section);
}

async function renderAllPosts() {
  const url = `http://localhost:3030/jsonstore/collections/myboard/posts`;
  Object.values(await request("Get", url)).map((data) => renderNewPost(data));
}

async function onSubmit(e) {
  e.preventDefault();
  if (e.submitter.className == `cancel`) {
    return formClear(e);
  }
  let date = new Date();
  date = date.toDateString();
  const body = Object.assign(getFormData(e), { date });
  renderNewPost(await createPost(body));
  formClear(e);
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

  div.querySelector("a").addEventListener(`click`, () => {
    section.remove();
    showDetails(data._id);
  });
  document.querySelector(`.topic-title`).appendChild(div);
}
async function createPost(body) {
  const url = `http://localhost:3030/jsonstore/collections/myboard/posts`;
  const data = await request("Post", url, body);
  return data;
}
