import { html, render } from "./node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

const btnSearch = document.querySelector(`button`);
const root = document.querySelector(`#towns`);

const createUl = () => html`<ul></ul>`;
render(createUl(), root);

const createLi = (town) => html`<li>${town}</li>`;
render(towns.map(createLi), root);

btnSearch.addEventListener(`click`, onClick);

function onClick(e) {
  const input = document.getElementById(`searchText`).value;
  const allLi = document.querySelectorAll(`li`);
  let counter = 0;
  allLi.forEach((li) => li.classList.remove("active"));
  if (input.length != 0) {
    towns.forEach((town) => {
      if (town.includes(input)) {
        allLi.forEach((li) => {
          if (li.textContent == town) {
            counter++;
            li.classList.add("active");
          }
        });
      }
    });
  }
  document.querySelector(`#result`).textContent = `${counter} matches found`;
}
