import { html } from "../../node_modules/lit-html/lit-html.js";
import { editBook, getBookById } from "../api/data.js";

let context = null;
let book = null;
export async function showEdit(ctx) {
  context = ctx;
  const bookId = ctx.params.id;
  book = await getBookById(bookId);
  console.log(book);
  ctx.render(editTemp(book));
}

async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const { title, description, imageUrl, type } = Object.fromEntries(formData);
  if (!title || !description || !imageUrl || !type) {
    alert(`All fields are manditory!`);
    return;
  }
  console.log(book._id);

  await editBook(context.params.id, title, description, imageUrl, type);

  context.page.redirect(`/details/${book._id}`);
}

function editTemp(book) {
  return html` <section id="edit-page" class="edit">
    <form @submit=${onSubmit} id="edit-form" action="#" method="">
      <fieldset>
        <legend>Edit my Book</legend>
        <p class="field">
          <label for="title">Title</label>
          <span class="input">
            <input type="text" name="title" id="title" value=${book.title} />
          </span>
        </p>
        <p class="field">
          <label for="description">Description</label>
          <span class="input">
            <textarea name="description" id="description">
${book.description}</textarea
            >
          </span>
        </p>
        <p class="field">
          <label for="image">Image</label>
          <span class="input">
            <input
              type="text"
              name="imageUrl"
              id="image"
              value=${book.imageUrl}
            />
          </span>
        </p>
        <p class="field">
          <label for="type">Type</label>
          <span class="input">
            <select id="type" name="type" value=${book.type}>
              <option value="Fiction">Fiction</option>
              <option value="Romance">Romance</option>
              <option value="Mistery">Mistery</option>
              <option value="Classic">Clasic</option>
              <option value="Other">Other</option>
            </select>
          </span>
        </p>
        <input class="button submit" type="submit" value="Save" />
      </fieldset>
    </form>
  </section>`;
}
