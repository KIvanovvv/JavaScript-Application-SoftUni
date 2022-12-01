import { html, render } from "../node_modules/lit-html/lit-html.js";

const root = document.querySelector(`nav`);

export function updateNav() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
    render(userTemp(), root);
  } else {
    render(guestTemp(), root);
  }
}

const userTemp = () => html` <div>
    <a href="/dashboard">Dashboard</a>
  </div>
  <div class="user">
    <a href="/create">Create Offer</a>
    <a href="/logout">Logout</a>
  </div>`;

const guestTemp = () => html`<div>
    <a href="/dashboard">Dashboard</a>
  </div>
  <div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </div>`;
