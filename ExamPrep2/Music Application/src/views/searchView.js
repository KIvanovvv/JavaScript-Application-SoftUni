import { html, nothing, render } from "../../node_modules/lit-html/lit-html.js";
import { getAlbumByQuery } from "../api/data.js";

export function showSearch(ctx) {
  ctx.render(searchTemp(onSearch));
  const inputField = document.getElementById(`search-input`);
  let query = "";
  async function onSearch(e) {
    e.preventDefault();
    debugger;
    query = getValue();
    const album = await getAlbumByQuery(query);
    let user = ctx.user;
    console.log(user);
    ctx.render(searchTempWithRes(onSearch, album, user));
  }
}
function getValue() {
  return document.getElementById(`search-input`).value;
}

function searchTempWithRes(onSearch, album, user) {
  debugger;
  return html` <section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
      <input
        id="search-input"
        type="text"
        name="search"
        placeholder="Enter desired albums's name"
      />
      <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    ${
      album.length > 0
        ? album.map((x) => showResults(x, user))
        : html`<div class="search-result">
            <p class="no-result">No result.</p>
          </div>`
    }
   

     
     
    </div>
  </section>`;
}

function searchTemp(onSearch) {
  return html` <section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
      <input
        id="search-input"
        type="text"
        name="search"
        placeholder="Enter desired albums's name"
      />
      <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

  
    </div>
  </section>`;
}
function showResults(album, user) {
  return html` <div class="search-result">
    <!--If have matches-->
    <div class="card-box">
      <img src=${album.imgUrl} />
      <div>
        <div class="text-center">
          <p class="name">Name: ${album.name}</p>
          <p class="artist">Artist: ${album.artist}</p>
          <p class="genre">Genre: ${album.genre}</p>
          <p class="price">Price: $${album.price}</p>
          <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${user
          ? html` <div class="btn-group">
              <a href="/details/${album._id}" id="details">Details</a>
            </div>`
          : nothing}
      </div>
    </div>
  </div>`;
}
