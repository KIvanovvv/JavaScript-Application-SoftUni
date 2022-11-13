import { html, render } from "./node_modules/lit-html/lit-html.js";

const btn = document.getElementById(`btnLoadTowns`);
const root = document.getElementById(`root`);

btn.addEventListener(`click`, onClick);

const createUl = () => html`<ul></ul>`;
const createLi = (name) => html`<li>${name}</li>`;
function onClick(e) {
  e.preventDefault();
  render(createUl(), root);
  const rootUl = document.querySelector(`ul`);
  let inputs = document.querySelector(`#towns`).value;
  inputs = inputs.split(", ");
  render(inputs.map(createLi), rootUl);
}
