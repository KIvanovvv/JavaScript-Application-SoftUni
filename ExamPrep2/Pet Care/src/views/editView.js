import { html } from "../../node_modules/lit-html/lit-html.js";
import { editDetails, getById } from "../api/data.js";
import { petId } from "./dashboardView.js";

let context = null;
export async function showEdit(ctx) {
  context = ctx;
  const data = await getById(petId);
  console.log(data);
  ctx.render(editTemplate(data));
  const form = document.querySelector(`form`);
  form.addEventListener(`submit`, onSubmit);
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { name, breed, age, weight, image } = Object.fromEntries(formData);
  if (name == "" || breed == "" || age == "" || weight == "" || image == "") {
    return;
  }
  await editDetails(petId, { name, breed, age, weight, image });
  context.page.redirect("/details");
}

function editTemplate(data) {
  return html`<section id="editPage">
    <form class="editForm">
      <img src="./images/editpage-dog.jpg" />
      <div>
        <h2>Edit PetPal</h2>
        <div class="name">
          <label for="name">Name:</label>
          <input name="name" id="name" type="text" value=${data.name} />
        </div>
        <div class="breed">
          <label for="breed">Breed:</label>
          <input name="breed" id="breed" type="text" value=${data.breed} />
        </div>
        <div class="Age">
          <label for="age">Age:</label>
          <input name="age" id="age" type="text" value=${data.age} />
        </div>
        <div class="weight">
          <label for="weight">Weight:</label>
          <input name="weight" id="weight" type="text" value=${data.weight} />
        </div>
        <div class="image">
          <label for="image">Image:</label>
          <input name="image" id="image" type="text" value=${data.image} />
        </div>
        <button class="btn" type="submit">Edit Pet</button>
      </div>
    </form>
  </section>`;
}
