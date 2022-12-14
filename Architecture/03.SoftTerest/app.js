import { logout } from "./src/api/user.js";
import { initialize } from "./src/router.js";
import { showCatalog } from "./src/views/catalog.js";
import { showCreate } from "./src/views/create.js";
import { showDetails } from "./src/views/details.js";
import { showHome } from "./src/views/home.js";
import { showLogin } from "./src/views/login.js";
import { showRegister } from "./src/views/register.js";

// const homeView = document.getElementById(`homeView`);
// const registerView = document.getElementById(`registerView`);
// const loginView = document.getElementById(`loginView`);
// const dashboard = document.getElementById(`dashboard-holder`);
// const detailsView = document.getElementById(`detailsView`);
// const createView = document.getElementById(`createView`);
const defSection = document.getElementById("defSection").remove();

const link = {
  "/": showHome,
  "/catalog": showCatalog,
  "/login": showLogin,
  "/register": showRegister,
  "/details": showDetails,
  "/create": showCreate,
  "/logout": async function () {
    await logout();
    router.goTo("/");
    router.updateNavigate();
  },
};
const router = initialize(link);
router.updateNavigate();
router.goTo("/");
