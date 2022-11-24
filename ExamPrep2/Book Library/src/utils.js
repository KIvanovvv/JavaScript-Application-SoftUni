import { html, render } from "../node_modules/lit-html/lit-html.js";

const root = document.querySelector(`.navbar-dashboard`);

export function updateNav() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
    render(userTemp(user.email), root);
  } else {
    render(guestTemp(), root);
  }
}

const userTemp = (email) => html` <a href="/">Dashboard</a>
  <div id="user">
    <span>Welcome, ${email}</span>
    <a class="button" href="/myBooks">My Books</a>
    <a class="button" href="/addBook">Add Book</a>
    <a class="button" href="/logout">Logout</a>
  </div>`;

const guestTemp = () => html` <a href="/">Dashboard</a>
  <div id="guest">
    <a class="button" href="/login">Login</a>
    <a class="button" href="/register">Register</a>
  </div>`;
