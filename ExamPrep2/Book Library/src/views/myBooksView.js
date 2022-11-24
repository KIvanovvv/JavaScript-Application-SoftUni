import { html } from "../../node_modules/lit-html/lit-html.js";
import { getUserBooks } from "../api/data.js";

export async function showBooks(ctx) {
  const userId = ctx.user._id;
  const userBooks = await getUserBooks(userId);

  ctx.render(myBooksTemp(userBooks));
}

const bookCard = (book) => html`<li class="otherBooks">
  <h3>${book.title}</h3>
  <p>Type: ${book.type}</p>
  <p class="img"><img src=${book.imageUrl} /></p>
  <a class="button" href="/details/${book._id}">Details</a>
</li> `;

function myBooksTemp(userBooks) {
  return html` <section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${userBooks.length != 0
      ? html`<ul class="my-books-list">
          ${userBooks.map(bookCard)}
        </ul>`
      : html`<p class="no-books">No books in database!</p>`}
  </section>`;
}
