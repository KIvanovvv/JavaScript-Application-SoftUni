import { render } from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";
import { logout } from "./src/api/user.js";
import { updateNav } from "./src/utils/nav.js";
import { showPostcard } from "./src/views/createPostcardView.js";
import { showDashboard } from "./src/views/dashboardView.js";
import { showDetails } from "./src/views/detailsView.js";
import { showEdit } from "./src/views/editView.js";
import { showHome } from "./src/views/homeView.js";
import { showLogin } from "./src/views/loginView.js";
import { showRegister } from "./src/views/registerView.js";

const root = document.getElementById(`content`);

page(decorateContext);
page("/home", showHome);
page("/dashboard", showDashboard);
page("/login", showLogin);
page("/register", showRegister);
page("/logout", onLogout);
page("/details", showDetails);
page("/createPostcard", showPostcard);
page("/edit", showEdit);
page("*", showHome);
page.start();

async function onLogout(ctx) {
  await logout();
  updateNav();
  ctx.page.redirect("/");
}

function decorateContext(ctx, next) {
  ctx.render = function (content) {
    render(content, root);
  };
  next();
  ctx.updateNav = function () {
    return updateNav;
  };
}

updateNav();
