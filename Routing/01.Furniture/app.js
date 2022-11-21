import page from "./node_modules/page/page.mjs";
import { render } from "./node_modules/lit-html/lit-html.js";
import { showLogin } from "./views/loginView.js";
import { showDashboard } from "./views/dashboardView.js";
import { showRegister } from "./views/registerView.js";
import { logout } from "./api/user.js";

const root = document.querySelector(`.container`);

function decorateContext(ctx, next) {
  ctx.render = function (content) {
    render(content, root);
  };
  ctx.updateNav = function () {
    updateNav();
  };
  next();
}
page(decorateContext);
page("/", showDashboard);
page("/login", showLogin);
page("/register", showRegister);
page("/logout", showLogout);
page("*", showDashboard);

function updateNav() {
  const divUser = document.querySelector(`#user`);
  const divGuest = document.querySelector(`#guest`);

  if (localStorage.length == 0) {
    divUser.style.display = "none";
    divGuest.style.display = "inline";
  } else {
    divUser.style.display = "inline";
    divGuest.style.display = "none";
  }
}

updateNav();
page.start();

async function showLogout(ctx) {
  await logout();
  ctx.page.redirect("/");
}
