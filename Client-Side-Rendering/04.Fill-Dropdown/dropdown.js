import { get, post } from "./api.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";
const rootMenu = document.getElementById(`menu`);
const form = document.querySelector(`form`);
const url = `http://localhost:3030/jsonstore/advanced/dropdown`;
form.addEventListener(`submit`, addItem);

async function getData() {
  const data = await get(url);
  const options = Object.values(data);
  const optionsTemplate = (option) =>
    html`<option value=${option._id}>${option.text}</option>`;
  render(options.map(optionsTemplate), rootMenu);
}
getData();

async function addItem(e) {
  e.preventDefault();
  const input = e.target.querySelector(`input[type=text]`);
  await post(url, { text: input.value });
  getData();
  input.value = "";
}
