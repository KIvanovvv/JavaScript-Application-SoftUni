import { login } from "../api/user.js";
import { html } from "../node_modules/lit-html/lit-html.js";

let context = null;
export function showLogin(ctx) {
  context = ctx;
  ctx.render(loginTemplate(onSubmit));
  const form = document.querySelector(`form`);
  form.addEventListener(`submit`, onSubmit);
}

const loginTemplate = () => html` <div class="row space-top">
    <div class="col-md-12">
      <h1>Login User</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="email">Email</label>
          <input class="form-control" id="email" type="text" name="email" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="password">Password</label>
          <input
            class="form-control"
            id="password"
            type="password"
            name="password"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
      </div>
    </div>
  </form>`;

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData); //Object fromentries
  console.log(email, password);
  await login(email, password);
  context.updateNav();
  context.page.redirect("/");
}
