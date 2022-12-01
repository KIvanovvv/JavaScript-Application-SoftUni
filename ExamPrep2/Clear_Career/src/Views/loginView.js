import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/user.js";
import { updateNav } from "../utils.js";

let context = null;
export function showLogin(ctx) {
  context = ctx;
  ctx.render(loginTemp());
}

async function onLogin(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData);
  if (!email || !password) {
    alert(`All fields are required!`);
    return;
  }
  await login(email, password);
  updateNav();
  context.page.redirect("/dashboard");
}

function loginTemp() {
  return html`<section id="login">
    <div class="form">
      <h2>Login</h2>
      <form @submit=${onLogin} class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">Not registered? <a href="#">Create an account</a></p>
      </form>
    </div>
  </section>`;
}
