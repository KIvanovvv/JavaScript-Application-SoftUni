import { getAllItems } from "../api/data.js";
import { html } from "../node_modules/lit-html/lit-html.js";

export async function showDashboard(ctx) {
  ctx.updateNav();
  const data = await getAllItems();
  ctx.render(dashboardTemp(data));
  console.log(data);
}

function dashboardTemp(data) {
  return html`
    <div class="row space-top">
      <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
      </div>
    </div>
    ${data.map(itemCard)}
  `;
}

const itemCard = (item) => html` <div class="row space-top">
  <div class="col-md-4">
    <div class="card text-white bg-primary">
      <div class="card-body">
        <img src=${item.img} />
        <p>${item.description}</p>
        <footer>
          <p>Price: <span>${item.price} $</span></p>
        </footer>
        <div>
          <a href="”#”" class="btn btn-info">Details</a>
        </div>
      </div>
    </div>
  </div>
</div>`;
