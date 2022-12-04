import { html } from "../../node_modules/lit-html/lit-html.js";
import { addNewAlbum, editAlbum, getAlbumById } from "../api/data.js";

let context = null;
export async function showEdit(ctx) {
  context = ctx;
  const album = await getAlbumById(ctx.params.id);
  console.log(album);
  ctx.render(editTemp(album));
}

async function onEdit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { singer, album, imageUrl, release, label, sales } =
    Object.fromEntries(formData);
  if (!singer || !album || !imageUrl || !release || !label || !sales) {
    alert(`All fields are required!`);
    return;
  }
  await editAlbum(
    context.params.id,
    singer,
    album,
    imageUrl,
    release,
    label,
    sales
  );
  context.page.redirect(`/details/${context.params.id}`);
}

function editTemp(album) {
  return html` <section id="edit">
    <div class="form">
      <h2>Edit Album</h2>
      <form @submit=${onEdit} class="edit-form">
        <input
          type="text"
          name="singer"
          id="album-singer"
          placeholder="Singer/Band"
          value=${album.singer}
        />
        <input
          type="text"
          name="album"
          id="album-album"
          placeholder="Album"
          value=${album.album}
        />
        <input
          type="text"
          name="imageUrl"
          id="album-img"
          placeholder="Image url"
          value=${album.imageUrl}
        />
        <input
          type="text"
          name="release"
          id="album-release"
          placeholder="Release date"
          value=${album.release}
        />
        <input
          type="text"
          name="label"
          id="album-label"
          placeholder="Label"
          value=${album.label}
        />
        <input
          type="text"
          name="sales"
          id="album-sales"
          placeholder="Sales"
          value=${album.sales}
        />

        <button type="submit">post</button>
      </form>
    </div>
  </section>`;
}
