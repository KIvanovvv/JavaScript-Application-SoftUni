import { html, render, nothing } from "https://unpkg.com/lit-html?module";
import { contacts } from "./contacts.js";

const root = document.getElementById(`contacts`);

const createContact = (data) => html` <div class="contact card">
  <div>
    <i class="far fa-user-circle gravatar"></i>
  </div>
  <div class="info">
    <h2>Name: ${data.name}</h2>
    <button @click=${onClick} class="detailsBtn">Details</button>
    <div class="details" id="${data.id}">
      <p>Phone number: ${data.phoneNumber}</p>
      <p>Email: ${data.email}</p>
    </div>
  </div>
</div>`;

render(contacts.map(createContact), root);

function onClick(e) {
  let detailsEl = e.target.parentElement.querySelector(".details");
  console.log(detailsEl);
  if (detailsEl.style.display === "block") {
    detailsEl.style.display = "none";
  } else {
    detailsEl.style.display = "block";
  }
}
