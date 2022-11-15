import { html, render } from "./node_modules/lit-html/lit-html.js";
const root = document.querySelector(`tbody`);

async function loadData() {
  const url = `http://localhost:3030/jsonstore/advanced/table`;
  const response = await fetch(url);
  const data = await response.json();
  const info = Object.values(data);
  return info;
}
async function renderData() {
  const info = await loadData();
  render(
    info.map((el) => trTemplate(el)),
    root
  );
}
renderData();

function trTemplate(data) {
  return html`<tr class="${data.selected ? "select" : ""}">
    <td>${data.firstName} ${data.lastName}</td>
    <td>${data.email}</td>
    <td>${data.course}</td>
  </tr>`;
}

document.querySelector("#searchBtn").addEventListener("click", onClick);

async function onClick() {
  const input = document.querySelector(`#searchField`);
  const info = await loadData();
  const checkedInfo = info.map((el) => {
    if (el.firstName.toLowerCase().includes(input.value.toLowerCase())) {
      el.selected = true;
    }
    if (el.lastName.toLowerCase().includes(input.value.toLowerCase())) {
      el.selected = true;
    }
    if (el.email.toLowerCase().includes(input.value.toLowerCase())) {
      el.selected = true;
    }
    if (el.course.toLowerCase().includes(input.value.toLowerCase())) {
      el.selected = true;
    }
    return el;
  });

  render(checkedInfo.map(trTemplate), root);
  input.value = "";
}
