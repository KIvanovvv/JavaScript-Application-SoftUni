import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { logout } from "./api/user.js";
import { updateNav } from "./utils.js";
import { showAddBooks } from "./views/addBookView.js";
import { showDashboard } from "./views/dashboardView.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/editView.js";
import { showLogin } from "./views/loginView.js";
import { showBooks } from "./views/myBooksView.js";
import { showRegister } from "./views/registerView.js";

const root = document.getElementById(`site-content`);
page(decorateCtx);
page("/", showDashboard);
page("/login", showLogin);
page("/register", showRegister);
page("/logout", onLogout);
page("/myBooks", showBooks);
page("/details/:id", showDetails);
page("/addBook", showAddBooks);
page("/edit/:id", showEdit);
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

async function onLogout() {
  await logout();
  updateNav();
  page.redirect("/");
}
