import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/user.js";
import { updateNav } from "../utils/nav.js";

let context = null;
export function showLogin(ctx) {
  context = ctx;
  ctx.render(loginTemplate());
  const form = document.querySelector(`form`);
  form.addEventListener(`submit`, onSubmit);
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData);
  if (email == "" || password == "") {
    return;
  }
  await login(email, password);
  updateNav();
  context.page.redirect("/");
}

function loginTemplate() {
  return html` <section id="loginPage">
      <form class="loginForm">
        <img src="./images/logo.png" alt="logo" />
        <h2>Login</h2>

        <div>
          <label for="email">Email:</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="steven@abv.bg"
            value=""
          />
        </div>

        <div>
          <label for="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            value=""
          />
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
          <span>If you don't have profile click <a href="#">here</a></span>
        </p>
      </form>
    </section>
    s`;
}
