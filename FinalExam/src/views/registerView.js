import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/user.js";
import { updateNav } from "../utils.js";

let context = null;
export function showRegister(ctx) {
  context = ctx;
  ctx.render(registerTemp());
}

async function onRegister(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData);
  const rePass = formData.get("re-password");
  if (!email || !password || !rePass) {
    alert(`All fields are required`);
    return;
  }
  if (password !== rePass) {
    alert(`Passwords dont match!`);
    return;
  }
  await register(email, password);
  updateNav();
  context.page.redirect("/dashboard");
}

function registerTemp() {
  return html` <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form @submit=${onRegister} class="login-form">
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="password"
        />
        <input
          type="password"
          name="re-password"
          id="repeat-password"
          placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="#">Login</a></p>
      </form>
    </div>
  </section>`;
}
