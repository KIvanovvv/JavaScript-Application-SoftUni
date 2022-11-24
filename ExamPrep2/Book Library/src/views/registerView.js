import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/user.js";

let context = null;

export function showRegister(ctx) {
  context = ctx;
  ctx.render(registerTemp());
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    rePass: formData.get("confirm-pass"),
  };
  if (!data.email || !data.password || !data.rePass) {
    return;
  }
  if (data.password !== data.rePass) {
    return;
  }

  await register(data.email, data.password);

  context.updateNav();
  context.page.redirect("/");
}

function registerTemp() {
  return html` <section id="register-page" class="register">
    <form @submit=${onSubmit} id="register-form" action="" method="">
      <fieldset>
        <legend>Register Form</legend>
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
        <p class="field">
          <label for="repeat-pass">Repeat Password</label>
          <span class="input">
            <input
              type="password"
              name="confirm-pass"
              id="repeat-pass"
              placeholder="Repeat Password"
            />
          </span>
        </p>
        <input class="button submit" type="submit" value="Register" />
      </fieldset>
    </form>
  </section>`;
}
