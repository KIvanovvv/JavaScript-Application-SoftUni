import {
  html,
  noChange,
  nothing,
} from "../../node_modules/lit-html/lit-html.js";
import { deletePet, getById } from "../api/data.js";
import { petId, ownerId } from "./dashboardView.js";

let context = null;
let isOwner;
export async function showDetails(ctx) {
  context = ctx;
  const data = await getById(petId);
  ctx.render(detailsTemplate(data));
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user._id;
  if (userId == ownerId) {
    isOwner = true;
  } else {
    isOwner = false;
  }
  const deleteBtn = document.getElementById(`delete`);
  deleteBtn.addEventListener(`click`, onClick);
}

function detailsTemplate(data) {
  return html`<section id="detailsPage">
    <div class="details">
      <div class="animalPic"><img src=${data.image} /></div>
      <div>
        <div class="animalInfo">
          <h1>Name: ${data.name}</h1>
          <h3>Breed: ${data.breed} Inu</h3>
          <h4>Age: ${data.years}</h4>
          <h4>Weight: ${data.weight}</h4>
          <h4 class="donation">Donation: 0$</h4>
          ${isOwner
            ? nothing
            : html`<div class="actionBtn">
                <a href="/edit" class="edit">Edit</a>
                <a id="delete" href="#" class="remove">Delete</a>
              </div>`}
        </div>
      </div>
    </div>
  </section> `;
}

async function onClick(e) {
  e.preventDefault();
  console.log(`Is clicked`);
  let res = confirm(`Are you sure`);
  if (res) {
    await deletePet(petId);
    context.page.redirect("/home");
  } else {
    return;
  }
}

{
  /* <section id="detailsPage">
        <div class="details">
          <div class="animalPic">
            <img src="./images/Shiba-Inu.png" />
          </div>
          <div>
            <div class="animalInfo">
              <h1>Name: Max</h1>
              <h3>Breed: Shiba Inu</h3>
              <h4>Age: 2 years</h4>
              <h4>Weight: 5kg</h4>
              <h4 class="donation">Donation: 0$</h4>
            </div>
          </div>
        </div>
      </section> */
}
