import { html } from "../../node_modules/lit-html/lit-html.js";
import { addNewOffer } from "../api/data.js";
import { updateNav } from "../utils.js";

let context = null;
export async function showCreate(ctx) {
  context = ctx;
  ctx.render(createTemp());
}

async function onCreate(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { title, imageUrl, category, description, requirements, salary } =
    Object.fromEntries(formData);
  console.log(title, imageUrl, category, description, requirements, salary);
  if (
    !title ||
    !imageUrl ||
    !category ||
    !description ||
    !requirements ||
    !salary
  ) {
    alert(`All fields are rquired!`);
    return;
  }
  await addNewOffer(
    title,
    imageUrl,
    category,
    description,
    requirements,
    salary
  );
  updateNav();
  context.page.redirect("/dashboard");
}

function createTemp() {
  return html` <section id="create">
    <div class="form">
      <h2>Create Offer</h2>
      <form @submit="${onCreate}class" ="create-form">
        <input type="text" name="title" id="job-title" placeholder="Title" />
        <input
          type="text"
          name="imageUrl"
          id="job-logo"
          placeholder="Company logo url"
        />
        <input
          type="text"
          name="category"
          id="job-category"
          placeholder="Category"
        />
        <textarea
          id="job-description"
          name="description"
          placeholder="Description"
          rows="4"
          cols="50"
        ></textarea>
        <textarea
          id="job-requirements"
          name="requirements"
          placeholder="Requirements"
          rows="4"
          cols="50"
        ></textarea>
        <input type="text" name="salary" id="job-salary" placeholder="Salary" />

        <button type="submit">post</button>
      </form>
    </div>
  </section>`;
}
