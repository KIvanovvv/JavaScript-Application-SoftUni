import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import {
  addLike,
  deleteAlbum,
  getAlbumById,
  getLikes,
  getLikesForUser,
} from "../api/data.js";

let context = null;
let totalLikes = 0;
export async function showDetails(ctx) {
  context = ctx;
  const album = await getAlbumById(ctx.params.id);
  let hasUser = false;
  let userId = false;
  let userLikes = 0;
  if (ctx.user) {
    hasUser = true;
    userId = ctx.user._id;
  }
  const isOwner = userId === album._ownerId;

  let likes = await getLikes(ctx.params.id);
  if (hasUser) {
    userLikes = await getLikesForUser(ctx.params.id, userId);
    console.log(userLikes);
  }

  ctx.render(detailsTemp(album, isOwner, hasUser, likes, userLikes));
}

function detailsTemp(album, isOwner, hasUser, likes, userLikes) {
  return html`<section id="details">
    <div id="details-wrapper">
      <p id="details-title">Album Details</p>
      <div id="img-wrapper">
        <img src=${album.imageUrl} alt="example1" />
      </div>
      <div id="info-wrapper">
        <p>
          <strong>Band:</strong><span id="details-singer">${album.singer}</span>
        </p>
        <p>
          <strong>Album name:</strong
          ><span id="details-album">${album.album}</span>
        </p>
        <p>
          <strong>Release date:</strong
          ><span id="details-release">${album.release}</span>
        </p>
        <p>
          <strong>Label:</strong><span id="details-label">${album.label}</span>
        </p>
        <p>
          <strong>Sales:</strong><span id="details-sales">${album.sales}</span>
        </p>
      </div>
      <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

      ${hasUser
        ? isOwner
          ? html` <div id="action-buttons">
              <a href="/edit/${album._id}" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="#" id="delete-btn">Delete</a>
            </div>`
          : html` <div id="action-buttons">
              ${userLikes == 0
                ? html`<a @click=${onLike} href="#" id="like-btn">Like</a>`
                : nothing}
            </div>`
        : nothing}
    </div>
  </section>`;
}
async function onLike(e) {
  e.preventDefault();
  const id = context.params.id;
  await addLike(id);
  context.page.redirect(`/details/${id}`);
}

async function onDelete(e) {
  e.preventDefault();
  const isConfirmed = confirm(`Are you sure?`);
  if (isConfirmed) {
    await deleteAlbum(context.params.id);
    context.page.redirect("/dashboard");
  }
}
