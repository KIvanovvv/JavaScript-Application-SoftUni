import { displayMonth } from "./monthNav.js";

export function displayYears() {
  document.querySelector(`#years`).style.display = "block";
  const yearTd = [
    ...document.querySelector(`#years`).querySelectorAll(`td.day`),
  ];
  for (let el of yearTd) {
    el.addEventListener(`click`, onClickYear);
  }
}

function onClickYear(e) {
  let currYear = "";
  if (e.target.className == "date") {
    currYear = e.target.textContent;
  } else {
    currYear = e.target.children[0].textContent;
  }
  document.querySelector(`#years`).style.display = "none";
  displayMonth(currYear);
}
