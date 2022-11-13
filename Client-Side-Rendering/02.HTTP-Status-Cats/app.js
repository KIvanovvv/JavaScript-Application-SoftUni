import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

const root = document.getElementById(`allCats`);
const createUl = () => html`<ul></ul>`;
render(createUl(), root);
const rootUl = document.querySelector(`ul`);

const createCat = (cat) => html` <li>
  <img
    src="./images/${cat.imageLocation}.jpg"
    width="250"
    height="250"
    alt="Card image cap"
  />
  <div class="info">
    <button @click=${onClick} class="showBtn">Show status code</button>
    <div class="status" style="display: none" id="${cat.id}">
      <h4>Status Code: ${cat.statusCode}</h4>
      <p>${cat.statusMessage}</p>
    </div>
  </div>
</li>`;
render(cats.map(createCat), rootUl);

function onClick(e) {
  const div = e.target.parentElement.querySelector("div");
  if (div.style.display == `none`) {
    div.style.display = "block";
    e.target.textContent = "Hide status code";
  } else {
    div.style.display = `none`;
    e.target.textContent = "Show status code";
  }
  render(cats.map(createCat), rootUl);
}
