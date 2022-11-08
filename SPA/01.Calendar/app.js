import { displayYears } from "./yearNav.js";

window.addEventListener(`DOMContentLoaded`, startingView);
function startingView() {
  [...document.querySelectorAll(`section`)].forEach(
    (s) => (s.style.display = "none")
  );
  displayYears();
}
