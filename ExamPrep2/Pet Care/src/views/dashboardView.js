import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { repeat } from "../../node_modules/lit-html/directives/repeat.js";
import { getAllAnimals } from "../api/data.js";

let context = null;
let allAnimals = [];
let isLogedIn = false;
export let petId;
export let ownerId;
export async function showDashboard(ctx) {
  allAnimals = await getAllAnimals();
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
    isLogedIn = true;
  } else {
    isLogedIn = false;
  }
  ctx.render(dashboardTemplate(allAnimals));
}

function dashboardTemplate(allAnimals) {
  return html`<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
      ${allAnimals.length != 0
        ? repeat(allAnimals, (a) => a._id, animalCard)
        : html`<div>
            <p class="no-pets">No pets in dashboard</p>
          </div>`}
    </div>
  </section>`;
}

function animalCard(animal) {
  return html` <div id=${animal._ownerId} class="animals-board">
    <article class="service-img">
      <img class="animal-image-cover" src=${animal.image} />
    </article>
    <h2 class="name">${animal.name}</h2>
    <h3 class="breed">${animal.breed}</h3>

    
      <div id=${
        animal._id
      } class="action"><a @click=${onCLick} class="btn" href=${
    isLogedIn ? "/details" : "#"
  }>Details</a></div></div>
  </div>`;
}
function onCLick(e) {
  petId = e.target.parentElement.id;
  ownerId = e.target.parentElement.parentElement.id;
}

// ${isLogedIn
//   ? html` <div class="action"><a class="btn" href="/details">Details</a></div></div>`
//   : nothing}
