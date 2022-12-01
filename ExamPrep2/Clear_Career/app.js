import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { logout, login, register } from "./src/api/user.js";
import { updateNav } from "./src/utils.js";
import { showCreate } from "./src/Views/createView.js";
import { showDashboard } from "./src/Views/dashboardView.js";
import { showDetails } from "./src/Views/detailsView.js";
import { showEdit } from "./src/Views/editView.js";
import { showHome } from "./src/Views/homeView.js";
import { showLogin } from "./src/Views/loginView.js";
import { showRegister } from "./src/Views/registerView.js";

const root = document.querySelector(`main`);

page(decorateCtx);
page("/", showHome);
page("/index.html", showHome);
page("/logout", onLogout);
page("/login", showLogin);
page("/register", showRegister);
page("/dashboard", showDashboard);
page("/details/:id", showDetails);
page("/create", showCreate);
page("/edit/:id", showEdit);
// page("/search", showSearch);
page("*", showHome);

page.start();
updateNav();

function decorateCtx(ctx, next) {
  ctx.render = (content) => render(content, root);
  ctx.updateNav = updateNav;
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
    ctx.user = user;
  }
  next();
}
window.login = login;
window.register = register;
window.logout = logout;
//login("peter@abv.bg", "123456");
async function onLogout() {
  await logout();
  updateNav();
  page.redirect("/");
}
