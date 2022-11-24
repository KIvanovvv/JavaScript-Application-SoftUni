import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/user.js";

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
  context.updateNav();
  context.page.redirect("/");
}

function loginTemp() {
  return html`<section id="login-page" class="login">
    <form @submit=${onSubmit} id="login-form" action="" method="">
      <fieldset>
        <legend>Login Form</legend>
        <p class="field">
          <label for="email">Email</label>
          <span class="input">
            <input type="text" name="email" id="email" placeholder="Email" />
          </span>
        </p>
        <p class="field">
          <label for="password">Password</label>
          <span class="input">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </span>
        </p>
        <input class="button submit" type="submit" value="Login" />
      </fieldset>
    </form>
  </section>`;
}
