import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteAlbum, getAlbumById } from "../api/data.js";

let context = null;
export async function showDetails(ctx) {
  context = ctx;
  const albumId = ctx.params.id;
  const album = await getAlbumById(albumId);
  const ownerId = album._ownerId;
  const userId = ctx.user._id;
  const isOwner = ownerId === userId;

  ctx.render(detailsTemp(album, isOwner));
}

function detailsTemp(album, isOwner) {
  return html` <section id="detailsPage">
    <div class="wrapper">
      <div class="albumCover">
        <img src=${album.imgUrl} />
      </div>
      <div class="albumInfo">
        <div class="albumText">
          <h1>Name: ${album.name}</h1>
          <h3>Artist: ${album.artist}</h3>
          <h4>Genre: ${album.genre}</h4>
          <h4>Price: $${album.price}</h4>
          <h4>Date: ${album.releaseDate}</h4>
          <p>Description:${album.description}</p>
        </div>

        ${isOwner
          ? html`<div class="actionBtn">
              <a href="/edit/${album._id}" class="edit">Edit</a>
              <a @click=${onDel} href="#" class="remove">Delete</a>
            </div>`
          : nothing}
      </div>
    </div>
  </section>`;
}

async function onDel(e) {
  e.preventDefault();
  const albumId = context.params.id;
  let isClicked = confirm(`Are you sure?`);
  if (isClicked) {
    await deleteAlbum(albumId);
    context.page.redirect("/catalog");
  } else {
    return;
  }
}
