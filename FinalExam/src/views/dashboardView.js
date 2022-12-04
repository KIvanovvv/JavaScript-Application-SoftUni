import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllAlbums } from "../api/data.js";

export async function showDashboard(ctx) {
  const allAlbums = await getAllAlbums();
  console.log(allAlbums);

  ctx.render(dashboardTemp(allAlbums));
}

function albumTemp(album) {
  return html`<li class="card">
    <img src=${album.imageUrl} />
    <p>
      <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
    </p>
    <p>
      <strong>Album name: </strong><span class="album">${album.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
    <a class="details-btn" href="/details/${album._id}">Details</a>
  </li>`;
}

function dashboardTemp(allAlbums) {
  return html` <section id="dashboard">
    <h2>Albums</h2>
    ${allAlbums.length > 0
      ? html`<ul class="card-wrapper">
          ${allAlbums.map(albumTemp)}
        </ul> `
      : html` <h2>There are no albums added yet.</h2>`}
  </section>`;
}
