import { html } from "../../node_modules/lit-html/lit-html.js";
import { addNewAlbum } from "../api/data.js";

let context = null;
export function showAdd(ctx) {
  context = ctx;
  ctx.render(addTemp());
}

async function onAdd(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { singer, album, imageUrl, release, label, sales } =
    Object.fromEntries(formData);
  if (!singer || !album || !imageUrl || !release || !label || !sales) {
    alert(`All fields are required!`);
    return;
  }
  await addNewAlbum(singer, album, imageUrl, release, label, sales);
  context.page.redirect("/dashboard");
}
function addTemp() {
  return html` <section id="create">
    <div class="form">
      <h2>Add Album</h2>
      <form @submit=${onAdd} class="create-form">
        <input
          type="text"
          name="singer"
          id="album-singer"
          placeholder="Singer/Band"
        />
        <input type="text" name="album" id="album-album" placeholder="Album" />
        <input
          type="text"
          name="imageUrl"
          id="album-img"
          placeholder="Image url"
        />
        <input
          type="text"
          name="release"
          id="album-release"
          placeholder="Release date"
        />
        <input type="text" name="label" id="album-label" placeholder="Label" />
        <input type="text" name="sales" id="album-sales" placeholder="Sales" />

        <button type="submit">post</button>
      </form>
    </div>
  </section>`;
}
