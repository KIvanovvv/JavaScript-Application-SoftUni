import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteBook, getBookById } from "../api/data.js";

let context = null;
let isLikeClicked = false;
export async function showDetails(ctx) {
  context = ctx;
  const bookId = ctx.params.id;
  const book = await getBookById(bookId);
  let userId;

  if (ctx.user) {
    userId = ctx.user._id;
  } else {
    userId = false;
  }
  //const userId = ctx.user._id
  const ownerId = book._ownerId;
  const isOwner = userId === ownerId;
  if (!isLikeClicked) {
    ctx.render(detailsTemp(book, isOwner, userId));
  } else {
    ctx.render(detailsTempCliked(book, isOwner, userId));
  }
}
function detailsTempCliked(book, isOwner, userId) {
  return html` <section id="details-page" class="details">
    <div class="book-information">
      <h3>${book.title}</h3>
      <p class="type">Type: ${book.type}</p>
      <p class="img"><img src=${book.imageUrl} /></p>
      <div class="actions">
        <div class="likes">
          <img class="hearts" src="/images/heart.png" />
          <span id="total-likes">Likes: 0</span>
        </div>
      </div>
    </div>
    <div class="book-description">
      <h3>Description:</h3>
      <p>${book.description}</p>
    </div>
  </section>`;
}

function detailsTemp(book, isOwner, userId) {
  return html` <section id="details-page" class="details">
    <div class="book-information">
      <h3>${book.title}</h3>
      <p class="type">Type: ${book.type}</p>
      <p class="img"><img src=${book.imageUrl} /></p>
      <div class="actions">
        ${isOwner
          ? html` <a class="button" href="/edit/${book._id}">Edit</a>
              <a @click=${onDelete} class="button" href="#">Delete</a>`
          : nothing}
        ${userId && !isOwner
          ? html`<a @click=${onClick} class="button" href="#">Like</a>`
          : nothing}

        <div class="likes">
          <img class="hearts" src="/images/heart.png" />
          <span id="total-likes">Likes: 0</span>
        </div>
      </div>
    </div>
    <div class="book-description">
      <h3>Description:</h3>
      <p>${book.description}</p>
    </div>
  </section>`;
}

function onClick(e) {
  e.preventDefault();
  isLikeClicked = true;
  e.target.style.display = `none`;
}

async function onDelete(e) {
  e.preventDefault();
  let confirmed = confirm(`Are you sure?`);
  if (confirmed) {
    await deleteBook(context.params.id);
    context.page.redirect("/");
  }
}
