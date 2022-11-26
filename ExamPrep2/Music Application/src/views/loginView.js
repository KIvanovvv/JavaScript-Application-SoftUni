import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/user.js";
import { updateNav } from "../utils.js";

let context = null;

export function showLogin(ctx) {
  context = ctx;
  ctx.render(loginTemp());
}
async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData);
  await login(email, password);
  updateNav();
  context.page.redirect("/");
}

function loginTemp() {
  return html` <section id="loginPage">
    <form @submit=${onSubmit}>
      <fieldset>
        <legend>Login</legend>

        <label for="email" class="vhide">Email</label>
        <input
          id="email"
          class="email"
          name="email"
          type="text"
          placeholder="Email"
        />

        <label for="password" class="vhide">Password</label>
        <input
          id="password"
          class="password"
          name="password"
          type="password"
          placeholder="Password"
        />

        <button type="submit" class="login">Login</button>

        <p class="field">
          <span>If you don't have profile click <a href="#">here</a></span>
        </p>
      </fieldset>
    </form>
  </section>`;
}
