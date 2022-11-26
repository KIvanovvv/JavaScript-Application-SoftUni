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

const userTemp = () => html` <img src="./images/headphones.png" />
  <a href="/">Home</a>
  <ul>
    <li><a href="/catalog">Catalog</a></li>
    <li><a href="/search">Search</a></li>
    <li><a href="/create">Create Album</a></li>
    <li><a href="/logout">Logout</a></li>
  </ul>`;

const guestTemp = () => html` <img src="./images/headphones.png" />
  <a href="/">Home</a>
  <ul>
    <li><a href="/catalog">Catalog</a></li>
    <li><a href="/search">Search</a></li>

    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
  </ul>`;
