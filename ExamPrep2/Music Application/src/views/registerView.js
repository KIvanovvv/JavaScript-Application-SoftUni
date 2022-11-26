import { html } from "../../node_modules/lit-html/lit-html.js";
import { login, register } from "../api/user.js";
import { updateNav } from "../utils.js";

let context = null;

export function showRegister(ctx) {
  context = ctx;
  ctx.render(registerTemp());
}
async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData);
  const rePass = formData.get("conf-pass");
  if (!email || !password || !rePass) {
    alert(`All fields are required!`);
    return;
  }
  if (password !== rePass) {
    alert(`Passwords don\'t match!`);
    return;
  }
  await register(email, password);
  updateNav();
  context.page.redirect("/");
}

function registerTemp() {
  return html`
    <section id="registerPage">
      <form @submit=${onSubmit}>
        <fieldset>
          <legend>Register</legend>

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

          <label for="conf-pass" class="vhide">Confirm Password:</label>
          <input
            id="conf-pass"
            class="conf-pass"
            name="conf-pass"
            type="password"
            placeholder="Confirm Password"
          />

          <button type="submit" class="register">Register</button>

          <p class="field">
            <span>If you already have profile click <a href="#">here</a></span>
          </p>
        </fieldset>
      </form>
    </section>
  `;
}
