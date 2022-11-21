import { render, html } from "../../node_modules/lit-html/lit-html.js";

const root = document.querySelector(`nav`);

export function updateNav() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
    render(logedUserTemp(), root);
  } else {
    render(guestUserTemp(), root);
  }
}

function logedUserTemp() {
  return html` <section class="logo">
      <img src="./images/logo.png" alt="logo" />
    </section>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/dashboard">Dashboard</a></li>
      <li><a href="/createPostcard">Create Postcard</a></li>
      <li><a href="/logout">Logout</a></li>
    </ul>`;
}

function guestUserTemp() {
  return html` <section class="logo">
      <img src="./images/logo.png" alt="logo" />
    </section>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/dashboard">Dashboard</a></li>
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>
    </ul>`;
}
