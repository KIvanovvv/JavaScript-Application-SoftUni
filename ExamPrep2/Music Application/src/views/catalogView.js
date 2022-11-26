import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getAllAlbums } from "../api/data.js";

let user = "";
export async function showCatalog(ctx) {
  const allAlbums = await getAllAlbums();

  let user;
  if (ctx.user) {
    user = true;
  } else {
    user = false;
  }
  ctx.render(catalogTemp(allAlbums, user));
}
function cardTemp(album, hasUser) {
  return html` <div class="card-box">
    <img src=${album.imgUrl} />
    <div>
      <div class="text-center">
        <p class="name">Name: ${album.name}</p>
        <p class="artist">Artist: ${album.artist}</p>
        <p class="genre">Genre: ${album.genre}</p>
        <p class="price">Price: $${album.price}</p>
        <p class="date">Release Date: ${album.releaseDate}</p>
      </div>
      ${hasUser
        ? html`<div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
          </div>`
        : nothing}
    </div>
  </div>`;
}

function catalogTemp(allAlbums, user) {
  return html` <section id="catalogPage">
    <h1>All Albums</h1>
    ${allAlbums.length > 0
      ? allAlbums.map((x) => cardTemp(x, user))
      : html`<p>No Albums in Catalog!</p>`}
  </section>`;
}
