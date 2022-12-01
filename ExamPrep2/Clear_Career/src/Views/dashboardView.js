import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllJobs } from "../api/data.js";

export async function showDashboard(ctx) {
  const allJobs = await getAllJobs();
  console.log(allJobs);
  ctx.render(dashboardTemp(allJobs));
}
function jobOfferTemp(job) {
  return html` <div class="offer">
    <img src=${job.imageUrl} />
    <p><strong>Title: </strong><span class="title">${job.title}</span></p>
    <p><strong>Salary:</strong><span class="salary">${job.salary}</span></p>
    <a class="details-btn" href=/details/${job._id}>Details</a>
  </div>`;
}

function dashboardTemp(allJobs) {
  return html`<section id="dashboard">
    <h2>Job Offers</h2>

    <!-- Display a div with information about every post (if any)-->
    ${allJobs.length > 0
      ? allJobs.map(jobOfferTemp)
      : html`<h2>No offers yet.</h2>`}
  </section>`;
}
