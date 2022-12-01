import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteJob, getJobById } from "../api/data.js";

let context = null;
export async function showDetails(ctx) {
  context = ctx;
  const currentJob = await getJobById(ctx.params.id);
  let userId;
  if (ctx.user) {
    userId = ctx.user._id;
  }
  const isOwner = currentJob._ownerId === userId;

  console.log(isOwner);
  ctx.render(detailsTemp(currentJob, isOwner, userId));
}

function detailsTemp(job, isOwner, userId) {
  return html`<section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${job.imageUrl} alt="example1" />
      <p id="details-title">${job.title}</p>
      <p id="details-category">
        Category: <span id="categories">${job.category}</span>
      </p>
      <p id="details-salary">
        Salary: <span id="salary-number">${job.salary}</span>
      </p>
      <div id="info-wrapper">
        <div id="details-description">
          <h4>Description</h4>
          <span>${job.description}</span>
        </div>
        <div id="details-requirements">
          <h4>Requirements</h4>
          <span>${job.requirements}</span>
        </div>
      </div>
      <p>Applications: <strong id="applications">1</strong></p>

      <!--Edit and Delete are only for creator-->
      ${userId
        ? isOwner
          ? html` <div id="action-buttons">
              <a href="/edit/${job._id}" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="#" id="delete-btn">Delete</a>
            </div>`
          : html` <div id="action-buttons">
              <a href="/apply" id="apply-btn">Apply</a>
            </div>`
        : nothing}
      }
    </div>
  </section>`;
}

async function onDelete(e) {
  e.preventDefault();
  const isConfirmed = confirm(`Are you sure?`);
  if (isConfirmed) {
    await deleteJob(context.params.id);
    context.page.redirect("/dashboard");
  }
}
