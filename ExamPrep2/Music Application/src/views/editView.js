import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { editAlbum, getAlbumById } from "../api/data.js";

let albumId;
let context = null;
export async function showEdit(ctx) {
  context = ctx;
  albumId = ctx.params.id;
  const album = await getAlbumById(albumId);
  ctx.render(editTemp(album));
}
async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { name, imgUrl, price, releaseDate, artist, genre, description } =
    Object.fromEntries(formData);
  if (
    !name ||
    !imgUrl ||
    !price ||
    !releaseDate ||
    !artist ||
    !genre ||
    !description
  ) {
    alert(`All fields are required!`);
    return;
  }
  await editAlbum(
    albumId,
    name,
    imgUrl,
    price,
    releaseDate,
    artist,
    genre,
    description
  );

  context.page.redirect(`/details/${albumId}`);
}
function editTemp(album) {
  return html` <section class="editPage">
    <form @submit=${onSubmit}>
      <fieldset>
        <legend>Edit Album</legend>

        <div class="container">
          <label for="name" class="vhide">Album name</label>
          <input
            id="name"
            name="name"
            class="name"
            type="text"
            value=${album.name}
          />

          <label for="imgUrl" class="vhide">Image Url</label>
          <input
            id="imgUrl"
            name="imgUrl"
            class="imgUrl"
            type="text"
            value=${album.imgUrl}
          />

          <label for="price" class="vhide">Price</label>
          <input
            id="price"
            name="price"
            class="price"
            type="text"
            value=${album.price}
          />

          <label for="releaseDate" class="vhide">Release date</label>
          <input
            id="releaseDate"
            name="releaseDate"
            class="releaseDate"
            type="text"
            value=${album.releaseDate}
          />

          <label for="artist" class="vhide">Artist</label>
          <input
            id="artist"
            name="artist"
            class="artist"
            type="text"
            value=${album.artist}
          />

          <label for="genre" class="vhide">Genre</label>
          <input
            id="genre"
            name="genre"
            class="genre"
            type="text"
            value=${album.genre}
          />

          <label for="description" class="vhide">Description</label>
          <textarea name="description" class="description" rows="10" cols="10">
${album.description}</textarea
          >

          <button class="edit-album" type="submit">Edit Album</button>
        </div>
      </fieldset>
    </form>
  </section>`;
}
